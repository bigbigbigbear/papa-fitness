module.exports = file => () => import('@/views/' + file + '.vue') // 在正式环境下使用懒加载
