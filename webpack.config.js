const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const flattenedEntryFiles = () => {
    const vendorCss = glob.sync(__dirname + "/src/css/vendor/**/*.css");
    const customCss = glob.sync(__dirname + "/src/css/*.css");
    const customSrcFiles = [
        __dirname + "/src/js/main.tsx",
        __dirname + "/src/css/scss/main.scss",
    ];
    return vendorCss.concat(customCss, customSrcFiles);
};

module.exports = (env) => {
    return {
        mode: "development",
        devtool: "source-map",
        watch: true,
        entry: flattenedEntryFiles(),
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
                // {
                //     test: /\.css$/i,
                //     loader: "css-loader",
                //     options: {
                //         sourceMap: true,
                //     },
                // },
                {
                    test: /\.s?css$/i,
                    // test: /\.s[ac]ss$/i,
                    use: [
                        // fallback to style-loader in development
                        // process.env.NODE_ENV !== "production"
                        //     ? "style-loader"
                        //     :
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            // options: {
                            //     sourceMap: true,
                            // },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                // sourceMap: true,
                                sassOptions: {
                                    outputStyle: "compressed",
                                },
                            },
                        },
                    ],
                },
                // {
                //     test: /\.css$/,
                //     use: [MiniCssExtractPlugin.loader, "css-loader"],
                // },
                // {
                //     test: /\.s[ac]ss$/i,
                //     use: [
                //         "style-loader",
                //         {
                //             loader: "css-loader",
                //             options: {
                //                 sourceMap: true,
                //                 modules: true,
                //                 // localIdentName: "[local]_[hash:base64:5]",
                //             },
                //         },
                //         {
                //             loader: "postcss-loader",
                //             options: {
                //                 sourceMap: true,
                //                 postcssOptions: {
                //                     plugins: [
                //                         [
                //                             "autoprefixer",
                //                             {
                //                                 // Options
                //                             },
                //                         ],
                //                     ],
                //                 },
                //             },
                //         },
                //         {
                //             loader: "sass-loader",
                //             options: { sourceMap: true },
                //         },
            ],

            // {
            //     test: /\.s[ac]ss$/i,
            //     // test: /\.scss$/,
            //     exclude: /node_modules/,
            //     use: [
            //         // "style-loader",
            //         // "css-loader",
            //         {
            //             loader: "file-loader",
            //             options: {
            //                 outputPath: "css/",
            //                 name: "[name].min.css",
            //             },
            //         },
            //         {
            //             loader: "sass-loader",
            //             options: {
            //                 sourceMap: true,
            //                 sassOptions: {
            //                     outputStyle: "compressed",
            //                     //     outFile: "css/rsdf.css",
            //                 },
            //             },
            //         },
            //     ],
            //   },
            //     {
            //         test: /\.scss$/,
            //         exclude: /node_modules/,
            //         use: [
            //             {
            //                 loader: "file-loader",
            //                 options: {
            //                     outputPath: "css/",
            //                     name: "[name].min.css",
            //                 },
            //             },
            //             "sass-loader",
            //         ],
        },

        // optimization: {
        //     splitChunks: {
        //         cacheGroups: {
        //             styles: {
        //                 name: "styles",
        //                 type: "css/mini-extract",
        //                 chunks: "all",
        //                 enforce: true,
        //             },
        //         },
        //     },
        // },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "css/[name].min.css",
            }),
        ],
        // module: {
        //     rules: [
        //         {
        //             test: /\.css$/,
        //             use: [MiniCssExtractPlugin.loader, "css-loader"],
        //         },
        //     ],
        // },

        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
        output: {
            filename: "js/[name].js",
            path: path.resolve(__dirname, "dist"),
        },
    };
};

// module.exports = {
//     mode: "development",
//     watch: true,
//     entry: "./src/js/index.tsx",
//     module: {
//         rules: [
//             {
//                 test: /\.tsx?$/,
//                 use: "ts-loader",
//                 exclude: /node_modules/,
//             },
//             {
//                 test: /\.s[ac]ss$/i,
//                 use: [
//                     // fallback to style-loader in development
//                     process.env.NODE_ENV !== "production"
//                         ? "style-loader"
//                         : MiniCssExtractPlugin.loader,
//                     "css-loader",
//                     "sass-loader",
//                 ],
//             },
//         ],
//     },
//     plugins: [
//         new MiniCssExtractPlugin({
//             // Options similar to the same options in webpackOptions.output
//             // both options are optional
//             // filename: "[name].css",
//             filename: "bundle.css",
//             chunkFilename: "[id].css",
//         }),
//     ],
//     resolve: {
//         extensions: [".tsx", ".ts", ".js"],
//     },
//     output: {
//         filename: "bundle.js",
//         path: path.resolve(__dirname, "dist/js"),
//     },
// };
