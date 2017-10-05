/**
 * Created by faraway on 17-6-10.
 */
import http from '../plugins/http/index'
import store from '../store'
const root = 'api/v2'

const shopsByType = []
const shopsPatch = []

const objectToCamel = (obj) => {
  function type () {
    return Object.prototype.toString.call(this).slice(8, -1)
  }
  function isArray (elem) {
    return type.call(elem) === 'Array'
  }
  function isObject (elem) {
    return type.call(elem) === 'Object'
  }
  function copy (obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }
    let name
    let target = isArray(obj) ? [] : {}
    let value
    for (name in obj) {
      value = obj[name]
      if (value === obj) {
        continue
      }
      if ((isArray(value) || isObject(value))) {
        target[toCamel(name)] = copy(value)
      } else {
        target[toCamel(name)] = value
      }
    }
    return target
  }
  function toCamel (str) {
    return str.replace(/_([a-z])/g, (m, w) => {
      return w.toUpperCase()
    })
  }
  return (copy(obj))
}

// 检查是否登录
export async function checkLoginStatus () {
  return await http.get(`${root}/users/status`).then(data => data.status)
}
// 获取主页内容
export async function getIndex () {
  return await http.get(`${root}/index`).then(objectToCamel)
}
// 获取某类型店铺列表信息
export async function getShopsBySubtype (subtype) {
  /*
  const query = store.state.cachedRequest.filter(res => {
    return res.requestType === 2 && res.shopType === subtype
  })
  if (query.length > 0) {
    return query[0].res
  }
  let res
  try {
    res = await http.post(`${root}/shops/list`, {
      'request_type': 2,
      'shop_type': subtype
    }, {
      headers: {
        'content-type': 'application/json'
      }
    }).then(objectToCamel)
    store.state.cachedRequest.push({
      requestType: 2,
      shopType: subtype,
      res
    })
    store.state.cachedShops.push(...res.shopList)
  } catch (e) {
    throw e
  }
  */
  return {
    shopList: shopsByType.filter(shop => shop.subtype === subtype).map(shop => {
      const res = shopsPatch.filter(localShop => localShop.shopName === shop.shopName)
      if (res.length > 0) {
        return res[res.length - 1]
      } else {
        return shop
      }
    })
  }
}
// 根据大类获取
export async function getShopsByType (type) {
  const query = store.state.cachedRequest.filter(res => {
    return res.requestType === 1 && res.shopType === type
  })
  if (query.length > 0) {
    return query[query.length - 1].res
  }
  let res
  try {
    res = await http.get(`${root}/shops/list`, {
      params: {
        'request_type': 1,
        'shop_type': type
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(objectToCamel)
    shopsByType.unshift(...res.shopList.map(shop => {
      const res = shopsPatch.filter(localShop => localShop.shopName === shop.shopName)
      if (res.length > 0) {
        return res[res.length - 1]
      } else {
        return shop
      }
    }))
    store.state.cachedRequest.push({
      requestType: 1,
      shopType: type,
      res
    })
  } catch (e) {
    throw e
  }
  // store.state.cachedShops.push(...res.shopList)
  return res
}
// 根据关键词搜索店铺
export async function searchShops (keyword) {
  let res = await http.get(`${root}/shops/list`, {
    params: {
      'request_type': 3,
      'key_word': keyword
    },
    headers: {
      'content-type': 'application/json'
    }
  }).then(objectToCamel)
  store.state.cachedShops.push(...res.shopList)
  return res
}
// 根据前缀获取店铺
/**
 * @param prefix
 * @returns {Promise.<Object>}
 */
export async function getShopsByPrefix (prefix) {
  return await http.get(`${root}/shops/list`, {
    params: {
      'request_type': 4,
      'prefix': prefix
    },
    headers: {
      'content-type': 'application/json'
    }
  }).then(objectToCamel)
  // 转换成驼峰式
}
// 等待图片加载
export async function waitImageToLoad (imageNode) {
  return new Promise((resolve, reject) => {
    if (imageNode.complete) {
      resolve(imageNode)
    } else {
      imageNode.onload = () => {
        resolve(imageNode)
      }
      imageNode.onerror = (error) => {
        reject(error)
      }
    }
  })
}

export async function getShopByName (name) {
  let shop = store.state.cachedShops.filter(shop => shop.shopName === name)
  if (shop.length <= 0) {
    return await http.get(`${root}/shops?shop_name=${name}`).then(objectToCamel)
  } else {
    return shop[shop.length - 1]
  }
}

export async function searchHistory () {
  return await http.get(`${root}/shops/search_history`).then(objectToCamel)
}

export async function hotRecords () {
  return await http.get(`${root}/shops/hot_records`).then(objectToCamel)
}

export async function getAllTags (name) {
  return await http.get(`${root}/shops/tags?shop_name=${name}`).then(objectToCamel)
}
/**
 * @param {string} imageBase64String
 * @returns {Promise.<Object>}
 */
export async function uploadImage (imageBase64String) {
  return await http.post(`${root}/comments/images`, {
    'type': 'upload',
    'image': imageBase64String.split(',')[1]
  }, {
    headers: {
      'content-type': 'application/json'
    }
  }).then(objectToCamel)
}
/**
 * @param {String} shopName
 * @param {Number} shopScore
 * @param {String} commentText
 * @param {Array<String>} shopTags
 * @param {Array<String>} imagesURL
 * @returns {Promise<Object>}
 */
export async function addComment (shopName, shopScore, commentText, shopTags, imagesURL) {
  const temp = await http.post(`${root}/comments`, {
    'request_type': 1,
    'shop_name': shopName,
    'shop_score': shopScore,
    'comment_text': commentText,
    'shop_tags': shopTags,
    'imgs': imagesURL
  }).then(objectToCamel)

  shopsPatch.push(await http.get(`${root}/shops?shop_name=${shopName}`).then(objectToCamel))
  return temp
}

export async function wait (time) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
/**
 * @param {string} shopName
 * @returns {Promise.<Array.<Object>>}
 */
export async function getComments (shopName) {
  return await http.get(`${root}/comments`, {
    params: {
      'shop_name': shopName
    }
  }).then(objectToCamel)
}

export async function likeComment (authorOpenid, issueTime) {
  return await http.post(`${root}/comments`, {
    'request_type': 2,
    'author_openid': authorOpenid,
    'issue_time': issueTime,
    'like_status': true, // 是否点赞
    'dislike_status': false // 是否踩
  }).then(objectToCamel)
}

export async function cancelLikeComment (authorOpenid, issueTime) {
  return await http.post(`${root}/comments`, {
    'request_type': 2,
    'author_openid': authorOpenid,
    'issue_time': issueTime,
    'like_status': false, // 是否点赞
    'dislike_status': false // 是否踩
  }).then(objectToCamel)
}

export async function dislikeComment (authorOpenid, issueTime) {
  return await http.post(`${root}/comments`, {
    'request_type': 2,
    'author_openid': authorOpenid,
    'issue_time': issueTime,
    'like_status': false, // 是否点赞
    'dislike_status': true // 是否踩
  }).then(objectToCamel)
}

export async function cancelDislikeComment (authorOpenid, issueTime) {
  return await http.post(`${root}/comments`, {
    'request_type': 2,
    'author_openid': authorOpenid,
    'issue_time': issueTime,
    'like_status': false, // 是否点赞
    'dislike_status': false // 是否踩
  }).then(objectToCamel)
}

export async function getTypes () {
  return await http.get(`${root}/shops/types`)
    .then(objectToCamel)
    .then(types => {
      return types.reduce((ret, type) => {
        ret.push(...type.subtypes)
        return ret
      }, [])
    })
}

export async function userAddNewShop (shopName, shopLocation, src, msrc, width, height) {
  return await http.post(`${root}/shops`, {
    'request_type': 1,
    'shop_name': shopName,
    'shop_address': shopLocation,
    'imgs': [
      {
        src,
        msrc,
        width,
        height
      }
    ]
  }).then(objectToCamel)
}

export async function wechatConfig () {
  return await http.post(`${root}/jsapi`, {
    url: encodeURIComponent(window.location.href.split('#')[0])
  }).then(objectToCamel)
}

export async function getUserTicket () {
  const tickets = await http.get(`${root}/tickets`).then(objectToCamel)
  // tickets.push({
  //   'shop_name': 'F2咖啡', // 店铺名
  //   'discount': '没有优惠信息', // 优惠信息
  //   'start_time': Date.now(), // 有效时间起始时间戳
  //   'end_time': Date.now() + 1000, // 有效时间结束时间戳
  //   'is_finite': true, // 是否有限
  //   'shop_img': {
  //     'msrc': ''
  //   },
  //   'tickets': [
  //     {'number': '44444', 'valid': true},
  //     {'number': '44443', 'valid': true},
  //     {'number': '44445', 'valid': false},
  //     {'number': '44445', 'valid': false},
  //     {'number': '44445', 'valid': false},
  //     {'number': '44445', 'valid': false}
  //   ] // 用户拥有的所有该店铺的点券
  // })
  return tickets.map(objectToCamel)
}

let currentPromotion = '未知'

export function getCurrentPromotion () {
  return currentPromotion
}

export async function sendTicket (infinite = false) {
  currentPromotion = await http.post(`${root}/tickets`, {
    'request_type': 1,
    'type': infinite ? 'infinite' : 'finite'
  }).then(objectToCamel)
  return currentPromotion
}

export async function destroyTicket (number) {
  return await http.post(`${root}/tickets`, {
    'request_type': 0,
    'code': number
  }).then(objectToCamel)
}
