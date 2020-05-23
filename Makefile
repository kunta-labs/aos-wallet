launch:
	npm run start
rb:
	npm run build;
electron:
	npm run start-electron
electron_static:
	npm run start-electron-static
re:
	npm run build-electron;
package:
	npm run package;
build_restart:
	rm -rf ./node_modules/
	npm install;
	#node-gyp rebuild
	./node_modules/.bin/electron-rebuild;
	npm rebuild;
save:
	git add * -v;
	git commit -am ${M} -v;
	git push origin master -v ;
build_save_run:
	say "done" ;
	make build
