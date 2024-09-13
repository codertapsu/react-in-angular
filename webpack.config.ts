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
  const isProduction =
    targetOptions.target === 'build' &&
    targetOptions.configuration === 'production';

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
        rule.exclude = /\.module\.scss$/;
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
        test: /\.module\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',

            options: {
              modules: {
                localIdentName: isProduction
                  ? '[hash:base64]'
                  : '[path][name]__[local]--[hash:base64:5]',
              },
              esModule: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      }
    );
  }
  if (config.plugins) {
    config.plugins.push(
      new VueLoaderPlugin(),
      new DefinePlugin({
        STABLE_FEATURE: JSON.stringify(true),
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      })
    );
  }

  return config;
};
