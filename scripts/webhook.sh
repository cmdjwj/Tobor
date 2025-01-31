#!/bin/bash

# 加载 .env 文件（作为备选）
load_env() {
    if [ ! -z "$BOT_TOKEN" ] && [ ! -z "$WEBHOOK_URL" ]; then
        return 0
    fi

    if [ -f .env ]; then
        echo "从.env文件加载环境变量..."
        export $(cat .env | sed 's/#.*//g' | xargs)
    fi
}

# 检查必需的环境变量
check_env() {
    local missing_vars=()

    if [ -z "$BOT_TOKEN" ]; then
        missing_vars+=("BOT_TOKEN")
    fi
    if [ -z "$WEBHOOK_URL" ]; then
        missing_vars+=("WEBHOOK_URL")
    fi

    if [ ${#missing_vars[@]} -ne 0 ]; then
        echo "错误: 以下环境变量未设置:"
        printf '%s\n' "${missing_vars[@]}"
        echo "请设置环境变量或在.env文件中配置"
        exit 1
    fi
}

# 构建 curl 命令
build_curl_cmd() {
    local cmd="curl -s"
    if [ "$USE_PROXY" = "true" ]; then
        cmd="$cmd -x ${PROXY_HOST}:${PROXY_PORT}"
    fi
    echo "$cmd"
}

BASE_API_URL="https://api.telegram.org/bot"

# 设置 webhook
setup_webhook() {
    echo "正在设置 webhook..."
    echo "URL: ${WEBHOOK_URL}"
    echo base url: ${BASE_API_URL}
    $(build_curl_cmd) "${BASE_API_URL}${BOT_TOKEN}/setWebhook?url=${WEBHOOK_URL}"
}

# 获取 webhook 信息
get_webhook_info() {
    echo "获取 webhook 信息..."
    $(build_curl_cmd) "${BASE_API_URL}${BOT_TOKEN}/getWebhookInfo"
}

# 删除 webhook
delete_webhook() {
    echo "正在删除 webhook..."
    $(build_curl_cmd) "${BASE_API_URL}${BOT_TOKEN}/deleteWebhook"
    echo
}

# 主函数
main() {
    load_env
    check_env
    
    case "$1" in
        "setup")
            delete_webhook
            setup_webhook
            get_webhook_info
            ;;
        "info")
            get_webhook_info
            ;;
        "delete")
            delete_webhook
            ;;
        *)
            echo "用法: $0 [setup|info|delete]"
            exit 1
            ;;
    esac
}

main "$@"