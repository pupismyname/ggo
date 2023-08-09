# GGO

Georgia Golden Olympics

https://georgiagoldenolympics.org/

Static site generated with 11ty, Liquid, Less, Liquid
Outputs HTML, CSS, jQuery


## Install
Requires Node 10+ (for 11ty)
```
npm ci
```


## Build
```
npm run build
```
builds to `_site`


## Dev
```
npm run dev
```
spins up http://localhost:8081 and watches for changes


## Clean
```
npm run clean
```
removes 11ty build folder, automatically run before `dev` and `build`
