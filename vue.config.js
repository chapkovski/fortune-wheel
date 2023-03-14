const path = require("path");
const pages =  {
    main: {
        entry: "./src/main.js",
        chunks: ["chunk-common","chunk-vendors" ]
    }

}
module.exports = {
    pages: pages,
    // Should be STATIC_URL + path/to/build
    publicPath: "/front/",
    lintOnSave: false,
    // Output to a directory in STATICFILES_DIRS
    outputDir: path.resolve(__dirname, "../_static/front/"),

    // Django will hash file names, not webpack
    filenameHashing: false,

    productionSourceMap: false,
    // See: https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    runtimeCompiler: true,

    devServer: {
        writeToDisk: true, // Write files to disk in dev mode, so Django can serve the assets
    },

    transpileDependencies: ["vuetify"],
    chainWebpack: config => {

        config.optimization
            .splitChunks({
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "chunk-vendors",
                        chunks: "all",
                        priority: 2
                    },
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "chunk-common",
                        chunks: "all",
                        priority: 1
                    },
                },
            });

        Object.keys(pages).forEach(page => {
            config.plugins.delete(`html-${page}`);
            config.plugins.delete(`preload-${page}`);
            config.plugins.delete(`prefetch-${page}`);
        })

        // config
        //     .plugin('BundleTracker')
        //     .use(BundleTracker, [{filename: '../vue_frontend/webpack-stats.json'}]);

        config.resolve.alias
            .set('__STATIC__', 'static')

        config.devServer
            .public('http://localhost:8080')
            .host('localhost')
            .port(8080)
            .hotOnly(true)
            .watchOptions({ poll: 1000 })
            .https(false)
            .headers({ "Access-Control-Allow-Origin": ["*"] })

    }
};
