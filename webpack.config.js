const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'index.js',
    library: {
      type: "commonjs"
    },    
  },
  plugins: [
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      }
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  externals: {
    lit: {
      commonjs: 'lit',
      commonjs2: 'lit',
      amd: 'lit',
      root: '_',
    },
    rxjs: {
      commonjs: 'rxjs',
      commonjs2: 'rxjs',
      amd: 'rxjs',
      root: '_',
    },    
  }
};


module.exports = (env) => {
  if (env.production) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return [config, {
    ...config,
    ...{
      output : {
        filename: 'index.umd.js',
        library: {
          type: "umd"
        }
      },
      externals: {}    
    }
  }];
};
