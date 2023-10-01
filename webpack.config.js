var path = require("path");
var BundleTracker = require("webpack-bundle-tracker");

module.exports = {
    mode: "development",

    devtool: "inline-source-map",
    devServer: {
        static: path.join(__dirname, "assets/dist"),
    },

    entry: path.join(__dirname, "assets/src/js/index"),

    output: {
        path: path.join(__dirname, "backend/assets/dist"),
        filename: "[name]-[hash].js",
        clean: true,
    },

    plugins: [
        new BundleTracker({
            path: __dirname,
            filename: "webpack-stats.json",
        }),
    ],

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};
