/**
 * Created by faraway on 17-7-24.
 */
/**
 * Created by faraway on 17-7-17.
 * =================================
 *
 *  A very very extremely fake React
 *  by me, not knowing where it will
 *  come in hand... 23333
 *
 * =================================
 */
let refs = {}
const React = {
  createElement: function (tag, attrs, ...params) {
    const element = document.createElement(tag)

    for (let name in attrs) {
      if (name === 'ref') {
        if (attrs[name] in refs) {
          /**
           * if refs[attrs[name]] already exits,
           * when it is an Array, just 'push' the
           * new element into it, when it is a
           * HTMLNode, put it into an Array and
           * 'push' the new element into it.
           */
          refs[attrs[name]] = [
            ...(
              Array.isArray(refs[attrs[name]])
                ? refs[attrs[name]] : [refs[attrs[name]]]
            )
          ].concat(element)
        } else {
          refs[attrs[name]] = element
        }
        continue
      }
      if (name && attrs.hasOwnProperty(name)) {
        let value = attrs[name]
        name = name === 'className' ? 'class' : name
        if (value === true) {
          element.setAttribute(name, name)
        } else if (value !== false && value !== null) {
          element.setAttribute(name, value.toString())
        }
      }
    }
    params.forEach((children) => {
      if (Array.isArray(children)) {
        children.forEach((child) => {
          element.appendChild(
            child.nodeType === undefined
              ? document.createTextNode(child.toString()) : child
          )
        })
      } else {
        element.appendChild(
          children.nodeType === undefined
            ? document.createTextNode(children.toString()) : children
        )
      }
    })
    return element
  },
  createRefsSet: function (refsSet) {
    refs = refsSet
  }
}

export default React
