import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // Стискання CSS-файлу
import webpcss from 'gulp-webpcss'; // Виведення WEBP-зображень
import autoprefixer from 'gulp-autoprefixer'; // Додавання вендорних префіксів
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Групування медіа-запитів

const sass = gulpSass(dartSass);

export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SCSS",
				message: "Error: <%= error.message %>"
			})))
		//1 .pipe(app.plugins.replace(/@img\//g, '../img/'))
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		// .pipe(app.plugins.replace(/@img\//g, '../img/'))

		.pipe(
			app.plugins.if(
				app.isBuild,
				groupCssMediaQueries()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				webpcss(
					{
						webpClass: ".webp",
						noWebpClass: ".no-webp"
					}
				)
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				autoprefixer({
					grid: true,
					overridBrowserlist: ["last 3 versions"],
					cascade: true
				})
			)
		)

		//Розкоментувати, якщо потрібен не стиснута кoпія файлу стилів
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(
			app.plugins.if(
				app.isBuild,
				cleanCss()
			)
		)
		.pipe(rename({
			extname: ".min.css"
		}))
		.pipe(app.plugins.replace(/@img\//g, '../img/'))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream());
} 