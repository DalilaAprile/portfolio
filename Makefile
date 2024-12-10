.PHONY: watch

watch:
	hugo server --gc --disableFastRender --noHTTPCache --bind 0.0.0.0 --baseURL http://192.168.1.72:1313
