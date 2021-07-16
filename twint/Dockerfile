FROM python:3.9.1
WORKDIR /twint-app
COPY requirements.txt requirements.txt
RUN pip3 install --user --upgrade git+https://github.com/twintproject/twint.git@origin/master#egg=twint

EXPOSE 5000
COPY . /twint-app
CMD ["python", "app.py"]