FROM python:3.7-alpine
WORKDIR /twint-app
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . /twint-app
CMD ["python", "app.py"]