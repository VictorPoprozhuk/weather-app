(function () {
   "use strict";
   var e = {
         807: function (e, t, r) {
            var a = r(6369),
               n = function () {
                  var e = this,
                     t = e._self._c;
                  return t(
                     "div",
                     {
                        style: { backgroundImage: `url(${e.getBg})` },
                        attrs: { id: "app" },
                     },
                     [
                        t("audio", {
                           ref: "audio",
                           attrs: {
                              src: `${e.getSound}`,
                              preload: "",
                              loop: "",
                              id: "audio",
                              muted: "",
                           },
                        }),
                        t("main", [
                           t("div", { staticClass: "search-box" }, [
                              t("input", {
                                 directives: [
                                    {
                                       name: "model",
                                       rawName: "v-model",
                                       value: e.query,
                                       expression: "query",
                                    },
                                 ],
                                 staticClass: "search-bar",
                                 attrs: {
                                    type: "text",
                                    placeholder: "Search...",
                                 },
                                 domProps: { value: e.query },
                                 on: {
                                    keypress: function (t) {
                                       return !t.type.indexOf(
                                          "key"
                                       ) &&
                                          e._k(
                                             t.keyCode,
                                             "enter",
                                             13,
                                             t.key,
                                             "Enter"
                                          )
                                          ? null
                                          : e.fetchWeather.apply(
                                               null,
                                               arguments
                                            );
                                    },
                                    input: function (t) {
                                       t.target.composing ||
                                          (e.query = t.target.value);
                                    },
                                 },
                              }),
                              t("button", {
                                 staticClass: "btn",
                                 on: { click: e.fetchWeather },
                              }),
                           ]),
                           t(
                              "div",
                              {
                                 directives: [
                                    {
                                       name: "show",
                                       rawName: "v-show",
                                       value: e.error,
                                       expression: "error",
                                    },
                                 ],
                                 staticClass: "error",
                              },
                              [e._v(" No such country found ")]
                           ),
                           null !== e.weather
                              ? t(
                                   "div",
                                   { staticClass: "weather-wrap" },
                                   [
                                      t(
                                         "div",
                                         {
                                            staticClass:
                                               "location-box",
                                         },
                                         [
                                            t(
                                               "div",
                                               {
                                                  staticClass:
                                                     "location",
                                               },
                                               [
                                                  e._v(
                                                     " " +
                                                        e._s(
                                                           e.weather
                                                              .name
                                                        ) +
                                                        ", " +
                                                        e._s(
                                                           e.weather
                                                              .sys
                                                              .country
                                                        ) +
                                                        " "
                                                  ),
                                               ]
                                            ),
                                            t(
                                               "div",
                                               {
                                                  staticClass: "date",
                                               },
                                               [
                                                  e._v(
                                                     "Monday 20 January 2020"
                                                  ),
                                               ]
                                            ),
                                         ]
                                      ),
                                      t(
                                         "div",
                                         {
                                            staticClass:
                                               "weather-box",
                                         },
                                         [
                                            t(
                                               "div",
                                               {
                                                  staticClass: "temp",
                                               },
                                               [
                                                  e._v(
                                                     " " +
                                                        e._s(
                                                           Math.round(
                                                              e
                                                                 .weather
                                                                 .main
                                                                 .temp
                                                           )
                                                        ) +
                                                        "° "
                                                  ),
                                               ]
                                            ),
                                            t(
                                               "div",
                                               {
                                                  staticClass:
                                                     "weather",
                                               },
                                               [
                                                  e._v(
                                                     " " +
                                                        e._s(
                                                           e.weather
                                                              .weather[0]
                                                              .main
                                                        ) +
                                                        " "
                                                  ),
                                               ]
                                            ),
                                         ]
                                      ),
                                   ]
                                )
                              : e._e(),
                           t(
                              "button",
                              {
                                 staticClass: "btn-muted",
                                 on: {
                                    click: function (t) {
                                       e.muted = !e.muted;
                                    },
                                 },
                              },
                              [e._v(" Muted ")]
                           ),
                        ]),
                     ]
                  );
               },
               s = [],
               i = r(6265),
               u = r.n(i),
               o = {
                  data() {
                     return {
                        api_key: "b89e0a4a6e00114441b58c1192197291",
                        url_base:
                           "https://api.openweathermap.org/data/2.5/",
                        query: "",
                        weather: null,
                        error: !1,
                        publicPath: "/",
                        muted: !1,
                     };
                  },
                  methods: {
                     async fetchWeather() {
                        let e = this.$refs.audio;
                        if ((e.pause(), "" !== this.query)) {
                           this.error = !1;
                           try {
                              const t = await u().get(
                                 `${this.url_base}weather?q=${this.query}&units=metric&appid=${this.api_key}`
                              );
                              (this.weather = t.data),
                                 setTimeout(() => {
                                    e.play();
                                 }, 500);
                           } catch (t) {
                              (this.weather = null),
                                 (this.error = !0);
                           }
                        }
                     },
                  },
                  computed: {
                     getSound() {
                        if (null === this.weather)
                           return "Clouds.mp3";
                        switch (this.weather.weather[0].main) {
                           case "Rain":
                              return "Rain.mp3";
                           case "Clear":
                              return "Clear.mp3";
                           case "Clouds":
                              return "Clouds.mp3";
                        }
                     },
                     getBg() {
                        if (null === this.weather)
                           return "https://raw.githubusercontent.com/TylerPottsDev/weather-vue/master/src/assets/cold-bg.jpg";
                        switch (this.weather.weather[0].main) {
                           case "Rain":
                              return "https://media.freestocktextures.com/cache/e1/3d/e13dbdfceb33473e2e1be208dd67d89d.jpg";
                           case "Clear":
                              return "https://media.istockphoto.com/photos/sun-on-blue-sky-with-clouds-picture-id824800468?k=20&m=824800468&s=612x612&w=0&h=Av3vLFHV48dsNZCQEg9A3Ga5qq1L2tdrsJ7fbNrqVKg=";
                           case "Clouds":
                              return "https://c1.wallpaperflare.com/preview/748/977/304/storm-sky-cloudy-weather.jpg";
                           default:
                              return "https://raw.githubusercontent.com/TylerPottsDev/weather-vue/master/src/assets/cold-bg.jpg";
                        }
                     },
                  },
                  watch: {
                     muted() {
                        let e = this.$refs.audio;
                        !0 === this.muted ? e.pause() : e.play();
                     },
                  },
               },
               c = o,
               l = r(1001),
               h = (0, l.Z)(c, n, s, !1, null, null, null),
               d = h.exports;
            new a.ZP({ render: (e) => e(d) }).$mount("#app");
         },
      },
      t = {};
   function r(a) {
      var n = t[a];
      if (void 0 !== n) return n.exports;
      var s = (t[a] = { exports: {} });
      return e[a](s, s.exports, r), s.exports;
   }
   (r.m = e),
      (function () {
         var e = [];
         r.O = function (t, a, n, s) {
            if (!a) {
               var i = 1 / 0;
               for (l = 0; l < e.length; l++) {
                  (a = e[l][0]), (n = e[l][1]), (s = e[l][2]);
                  for (var u = !0, o = 0; o < a.length; o++)
                     (!1 & s || i >= s) &&
                     Object.keys(r.O).every(function (e) {
                        return r.O[e](a[o]);
                     })
                        ? a.splice(o--, 1)
                        : ((u = !1), s < i && (i = s));
                  if (u) {
                     e.splice(l--, 1);
                     var c = n();
                     void 0 !== c && (t = c);
                  }
               }
               return t;
            }
            s = s || 0;
            for (var l = e.length; l > 0 && e[l - 1][2] > s; l--)
               e[l] = e[l - 1];
            e[l] = [a, n, s];
         };
      })(),
      (function () {
         r.n = function (e) {
            var t =
               e && e.__esModule
                  ? function () {
                       return e["default"];
                    }
                  : function () {
                       return e;
                    };
            return r.d(t, { a: t }), t;
         };
      })(),
      (function () {
         r.d = function (e, t) {
            for (var a in t)
               r.o(t, a) &&
                  !r.o(e, a) &&
                  Object.defineProperty(e, a, {
                     enumerable: !0,
                     get: t[a],
                  });
         };
      })(),
      (function () {
         r.g = (function () {
            if ("object" === typeof globalThis) return globalThis;
            try {
               return this || new Function("return this")();
            } catch (e) {
               if ("object" === typeof window) return window;
            }
         })();
      })(),
      (function () {
         r.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
         };
      })(),
      (function () {
         var e = { 143: 0 };
         r.O.j = function (t) {
            return 0 === e[t];
         };
         var t = function (t, a) {
               var n,
                  s,
                  i = a[0],
                  u = a[1],
                  o = a[2],
                  c = 0;
               if (
                  i.some(function (t) {
                     return 0 !== e[t];
                  })
               ) {
                  for (n in u) r.o(u, n) && (r.m[n] = u[n]);
                  if (o) var l = o(r);
               }
               for (t && t(a); c < i.length; c++)
                  (s = i[c]),
                     r.o(e, s) && e[s] && e[s][0](),
                     (e[s] = 0);
               return r.O(l);
            },
            a = (self["webpackChunkweather_app_vue"] =
               self["webpackChunkweather_app_vue"] || []);
         a.forEach(t.bind(null, 0)),
            (a.push = t.bind(null, a.push.bind(a)));
      })();
   var a = r.O(void 0, [998], function () {
      return r(807);
   });
   a = r.O(a);
})();
//# sourceMappingURL=app.2b5c6be2.js.map
