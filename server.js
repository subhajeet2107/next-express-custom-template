const express = require('express')
const next = require('next')
const { forEach } = require('lodash')
const routes = require('./routes')
const morgan = require('morgan')
const cacheableResponse = require('cacheable-response')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const Keyv = require('keyv')
const keyv = new Keyv('redis://localhost:6379', { namespace: 'cached_urls' })

const ssrCache = (() => {
	return cacheableResponse({
		cache: keyv,
		get: async ({req, res, ttl, route, query }) => {
				const rawResEnd = res.end
				const data = await new Promise((resolve) => {
					res.end = (payload) => {
						resolve(res.statusCode === 200 && payload)
					}
				  	app.render(req, res, route.page, query, {
				  	        ...req.query,
				  	        ...req.params,
				  	})
				})
			res.end = rawResEnd
			return { data, ttl }
		},
		send: ({ data, res, req, headers }) => {
			res.send(data)
		},
	})
})()

const handler = routes.getRequestHandler(app, ({req, res, route, query}) => {
	if(route && route.meta && route.meta.cache){
		ssrCache({req, res, ttl:1000*60*20, route, query})
	}else{
		app.render(req, res, route.page, query)
	}
	
})



app.prepare().then(() => {
	const server = express()
	if(dev){
		server.use(morgan('dev', {
			skip: function (req, res) { return req.url.includes('_next') }
		}))
	}

	server.use(handler)
	server.listen(port, (err) => {
		if (err) throw err
		console.log(`> Ready on http://localhost:${port}`)
	})
})