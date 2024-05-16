const GitHubApp = {
  async created() {
    this.userData = await getUserData();
    this.moonSvg = await getSvg(`moon`);
    this.sunSvg = await getSvg(`sun`);
  },
  data() {
    return {
      details: [
        new Detail(`location`, function () {
          return null;
        }),
        new Detail(`twitter`, function (userData) {
          const twitter = userData.twitter;

          return twitter ? `https://twitter.com/${twitter}` : null;
        }),
        new Detail(`website`, function (userData) {
          const website = userData.website;

          return website
            ? `${website?.startsWith(`https://`) ? `` : `https://`}${website}`
            : null;
        }),
        new Detail(`company`, function (userData) {
          return userData.html_url || null;
        }),
      ],
      error: null,
      moonSvg: ``,
      scheme: matchMedia(`(prefers-color-scheme: light)`).matches
        ? `light`
        : `dark`,
      sunSvg: ``,
      userData: {},
      userName: ``,
    };
  },
  methods: {
    getDetails(detail) {
      return this.userData[detail.fieldName] || `Not Available`;
    },
    getDetailsHref(detail) {
      return detail.href(this.userData);
    },
    getDetailsImgSrc(detail) {
      return `assets/images/icon-${detail.fieldName}.svg`;
    },
    getNoBioClass() {
      return this.userData.noBio ? `no-bio` : ``;
    },
    getNotAvailableClass(detail) {
      return !this.userData[detail.fieldName] ? `not-available` : ``;
    },
    getOtherScheme() {
      const isLight = this.scheme === `light`;

      return {
        iconSvg: `${isLight ? `moon` : `sun`}Svg`,
        scheme: isLight ? `dark` : `light`,
      };
    },
    async searchUser(event) {
      event.preventDefault();

      const responseData = await getUserData(this.userName);

      if (responseData) {
        this.userData = responseData;
        this.error = null;
      } else {
        this.error = `error`;
      }
    },
    toggleScheme() {
      this.scheme = this.getOtherScheme().scheme;
    },
  },
};

Vue.createApp(GitHubApp).mount(`#github-app`);
