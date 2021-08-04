FROM python:3.9.6
WORKDIR /filter-app
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
EXPOSE 5000
COPY . /filter-app
CMD ["python", "app.py"]