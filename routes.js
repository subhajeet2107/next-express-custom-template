const routes = module.exports = require('next-routes')()
 
routes
.add('index','/','index')
.add('about','/about/','about')
.add('qna','/ncert/question-:slug','qna/question')
.add('qna.stream','/:stream/question-:slug','qna/index')