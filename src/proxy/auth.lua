local http = require "resty.http"
local _M = {}

-- Get token from google auth server
local function get_id_token(audience)
    local httpc = http.new()
    local res, err = httpc:request_uri("http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity", {
        query = { audience = audience },
        headers = { ["Metadata-Flavor"] = "Google" },
    })

    if not res or res.status ~= 200 then
        ngx.log(ngx.ERR, "Failed to get token for: ", audience, " (", err or res.status, ")")
        return nil
    end
    return res.body
end

-- setup proxy
function _M.setup_proxy(env_var_name)
    local env = os.getenv("ENV") or "local"
    local target_url = os.getenv(env_var_name)

    -- no target url return error
    if not target_url then
        ngx.log(ngx.ERR, "Environment variable not found: ", env_var_name)
        ngx.exit(500)
    end

    -- if local development, do not add Authorization header
    if env == "local" then
        return target_url
    end

    if string.sub(target_url, 1, 5) == "https" then
        local token = get_id_token(target_url)
        if token then
            ngx.req.set_header("Authorization", "Bearer " .. token)
        end
    end

    return target_url
end

return _M
