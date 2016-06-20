module.exports = {
	src: 'src',
	dst: 'dst',
	port: process.env.PORT || 3600,
	production: process.env.NODE_ENV === 'production'
};