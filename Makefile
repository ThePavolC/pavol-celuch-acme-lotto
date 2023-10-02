.PHONY: install
install:
	poetry install

.PHONY: run-server
run-server:
	poetry run python backend/manage.py runserver

.PHONY: shell
shell:
	poetry run python backend/manage.py shell_plus --ipython

.PHONY: migrate
migrate:
	poetry run python backend/manage.py migrate

.PHONY: migrations
migrations:
	poetry run python backend/manage.py makemigrations

.PHONY: superuser
superuser:
	poetry run python backend/manage.py createsuperuser

.PHONY: install-pre-commit
install-pre-commit:
	poetry run pre-commit uninstall; poetry run pre-commit install

.PHONY: lint
lint:
	poetry run pre-commit run --all-files

.PHONY: update
update: install migrate install-pre-commit;

.PHONY: build-frontend
build-frontend:
	npm run build

.PHONY: run-frontend
run-frontend:
	npm run watch
