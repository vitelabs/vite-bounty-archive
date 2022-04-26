import { App } from 'vue'
import { camelCase, upperFirst } from 'lodash-es'

const registerBaseComponents = (app: App): void => {
  const requireComponent = require.context(
    '../components/base',
    true,
    /Base[\w-]+\.vue$/
  )

  requireComponent.keys().forEach((filePath) => {
    const componentConfig = requireComponent(filePath)
    const fileName = filePath.split('/').slice(-1)[0]
    const componentName = upperFirst(camelCase(fileName.replace(/\.\w+$/, '')))

    app.component(componentName, componentConfig.default || componentConfig)
  })
}

export default registerBaseComponents
