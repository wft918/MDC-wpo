FROM    node:14
COPY    . /opt/app/
#RUN     cd /opt/app && tar zxf node_modules.tar.gz
RUN     cd /opt/app && npm --registry https://registry.npm.taobao.org install
WORKDIR /opt/app
EXPOSE  8888 
CMD     ["npm", "run", "serve"]

