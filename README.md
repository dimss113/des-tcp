# des-tcp

## Topologi

<img width="505" alt="image" src="https://github.com/dimss113/des-tcp/assets/89715780/0e278fce-ad33-4864-8718-d61b0923732d">

## Network Configuration

- Router

```
auto eth0
 iface eth0 inet dhcp

 auto eth1
 iface eth1 inet static
 	address 192.172.1.1
 	netmask 255.255.255.0

```

- TCP-Server

```
auto eth0
 iface eth0 inet static
 	address 192.172.1.2
 	netmask 255.255.255.0
 	gateway 192.172.1.1
```

- TCP-Client

```
auto eth0
 iface eth0 inet static
 	address 192.172.1.3
 	netmask 255.255.255.0
 	gateway 192.172.1.1
```

## Instalasi Nodejs and Npm (Server)

```sh
echo "nameserver 192.168.122.1" > /etc/resolv.conf
apt-get update
apt install nodejs npm git -y

```

## Instalasi Nodejs and Npm (Client)

```sh
echo "nameserver 192.172.1.2
nameserver 192.168.122.1
" > /etc/resolv.conf
apt-get update
apt install nodejs npm git -y
```

## Result
- Server

<img width="426" alt="image" src="https://github.com/dimss113/des-tcp/assets/89715780/d684b75a-4a4a-472a-b63e-c2b2b5e0364a">

- Client

<img width="401" alt="image" src="https://github.com/dimss113/des-tcp/assets/89715780/4d93c4b9-0150-45e2-94d6-be7a9b06b7e9">
