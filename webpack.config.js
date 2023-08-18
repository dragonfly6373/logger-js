const path = require("path");
const Dotenv = require("dotenv-webpack");
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: "production",
    target: "node",
    entry: "./index.ts",
    externals: [nodeExternals()],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: ["node_modules"],
        fallback: {
            "http": false,
            "fs": false,
            "path": false,
            "url": false
        }
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader" }
        ],
    },
    plugins: [
        new Dotenv()
    ]
};
