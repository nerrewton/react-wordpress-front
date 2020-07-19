module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.jx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.scss$/,
                loader: ["css-loader", "sass-loader"],
            },
        ],
    },
    output: {
        filename: "bundle.js",
        path: __dirname + "/public",
    },
};
