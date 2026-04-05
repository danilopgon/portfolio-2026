import nextConfig from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import prettierConfig from 'eslint-config-prettier'

const config = [...nextConfig, ...nextTypescript, prettierConfig]

export default config
