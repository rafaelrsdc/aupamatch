FROM python:3.10-slim


SHELL ["/bin/bash", "-c"]

ARG DEBUG

RUN apt-get update -y && \
    apt-get install libpq-dev gcc -y

RUN useradd -m aupamatch

USER aupamatch

COPY . /home/aupamatch

WORKDIR /home/aupamatch

# Python dependencies
RUN python3 -m pip install --user poetry && \
    python3 -m poetry export -o requirements.txt && \
    python3 -m poetry export --dev -o requirements-dev.txt && \
    python3 -m pip install --user -r requirements.txt

RUN if [ "$DEBUG" = true ]; then python3 -m pip install --user -r requirements-dev.txt; fi

EXPOSE 8000

ENTRYPOINT ["sh", "entrypoint.sh"]

