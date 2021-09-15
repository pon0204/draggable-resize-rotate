export const getBoolEdgeRightTop = (edge) => {
  if((edge.right === true && edge.top === true) || (edge.right === true && edge.top === false && edge.left === false && edge.bottom === false)){
    return true
  }
  return false
  }
export const getBoolEdgeRightBottom = (edge) => {
  if((edge.right === true && edge.bottom === true) || (edge.right === false && edge.top === false && edge.left === false && edge.bottom === true)){
    return true
  }
  return false
}
export const getBoolEdgeLeftTop = (edge) => {
  if((edge.left === true && edge.top === true)|| (edge.right === false && edge.top === true && edge.left === false && edge.bottom === false)){
    return true
  }
  return false
}
export const getBoolEdgeLeftBottom = (edge) => {
  if((edge.left === true && edge.bottom === true) || (edge.right === false && edge.top === false && edge.left === true && edge.bottom === false)){
    return true
  }
  return false
}