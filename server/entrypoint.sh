#!/bin/bash

python3 manage.py migrate

python3 -m gunicorn project.wsgi:application -b 0.0.0.0:8000
