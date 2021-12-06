import path from 'path'

const onlyOneShowingChild = (children = [], parent) => {
  let onlyOneChild = null
  const showingChildren = children

  if (showingChildren.length === 1) {
    onlyOneChild = showingChildren[0]
    onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
    return onlyOneChild
  }

  if (showingChildren.length === 0) {
    onlyOneChild = {
      ...parent,
      path: ''
    }
    return onlyOneChild
  }

  return false
}

const generateRoutes = ({ routes, basePath = '/', accessRoutes = null, roles = [] }) => {
  const res = []
  for (let route of routes) {
    // // skip some route
    // if (route.roles && !route.roles.some(e => roles.includes(e))) continue

    const isOnlyOneShowingChild = onlyOneShowingChild(route.children, route)

    if (route.children && isOnlyOneShowingChild) route = isOnlyOneShowingChild

    const data = {
      ...route,
      path: path.resolve(basePath, route.path)
    }

    if (route.children) {
      data.children = generateRoutes({
        routes: route.children,
        basePath: data.path,
        accessRoutes,
        roles
      })
    }

    if (!accessRoutes || accessRoutes.includes(data.path)) res.push(data)
  }
  return res
}

export default generateRoutes
