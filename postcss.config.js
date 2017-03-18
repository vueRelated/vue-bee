//
module.exports = {
    plugins: [
        require('autoprefixer')({
            "browserlist": [
                "> 5%",
                "last 10 versions",
                "Firefox < 20",
                "ie 6-8"
            ]
        })
    ]
}
