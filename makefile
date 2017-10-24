run:
	python manage.py runserver

static:
	python manage.py collectstatic

db:
	python manage.py migrate
	python manage.py loaddata spa/fixtures/fixture.json

dump:
	mkdir -p spa/fixtures
	python manage.py dumpdata spa --indent 1 > spa/fixtures/fixture.json


requirements:
	pip install -r requirements.txt
