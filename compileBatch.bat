@rem 设置当前窗口名称为监控jade的窗口
@ title=watch pug files


@rem ---当前窗口初始化并编译所有pug文件，然后监控所有pug文件

@rem ---pug
start /b pug -P -w src/demo/pug/index.pug -o src/demo/pages/

start /b pug -P -w src/demo/pug/unit/lar-gallery/gallery.pug -o src/demo/pages/unit/lar-gallery/ -O src/demo/pages/unit/json/getFigureHead.json

start /b pug -P -w src/demo/pug/unit/lar-gallery/galleryTemplate.pug -o src/demo/pages/unit/lar-gallery/

@rem ---监控 所有sass文件

start "watch scss files" compass watch