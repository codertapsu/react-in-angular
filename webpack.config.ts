import {
  CustomWebpackBrowserSchema,
  TargetOptions,
} from '@angular-builders/custom-webpack';

import { VueLoaderPlugin } from 'vue-loader';

import { Configuration, DefinePlugin } from 'webpack';

export default (
  config: Configuration,
  options: CustomWebpackBrowserSchema,
  targetOptions: TargetOptions
) => {
  if (config.resolve && config.resolve.extensions) {
    config.resolve.extensions.push('.tsx', '.ts', '.js', '.vue', '.scss');
  }
  if (config.resolve && config.resolve.alias) {
    config.resolve.alias = {
      ...config.resolve.alias,
      vue: 'vue/dist/vue.esm-bundler.js',
      '@components': 'projects/main-portal/src/app/components',
    };
  }
  if (config.module && config.module.rules) {
    const defaultScssRules = [
      /\.(?:css)$/i.toString(),
      /\.(?:scss)$/i.toString(),
      /\.(?:sass)$/i.toString(),
      /\.(?:less)$/i.toString(),
    ];
    config.module.rules.forEach((rule: any) => {
      if (rule.test && defaultScssRules.includes(rule.test.toString())) {
        rule.exclude = /\.module\.scss$/; // Exclude .module.scss files
      }
    });
    config.module.rules.push(
      {
        test: /\.(tsx|ts)?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module\.scss$/, // Separate rule for .module.scss files
        exclude: /node_modules/, // Also exclude node_modules here
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',

            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]', // Customize class names
              },
              esModule: true, // Enable ES module syntax for CSS modules
            },
            // options: {
            //   modules: true, // Enable CSS modules for .module.scss
            //   // localIdentName: '[path][name]__[local]--[hash:base64:5]',
            // },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader', // This allows us to import .html files in the TypeScript file
        exclude: /node_modules/,
      }
    );
  }
  if (config.plugins) {
    config.plugins.push(
      new VueLoaderPlugin(),
      new DefinePlugin({
        STABLE_FEATURE: JSON.stringify(true),
      })
    );
  }

  return config;
};
