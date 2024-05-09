import { debounce } from 'lodash-es';

export default {
  data() {
    return {
      keyword: '',
      pager: {
        page: 1,
        pageSize: 20,
        totalPage: 0,
        total: 0
      }
    };
  },
  computed: {
    fieldNames() {
      return {
        label: this.field.options.labelKey || 'label',
        value: this.field.options.valueKey || 'value',
        options: 'options'
      };
    },
    selectOps() {
      const showSearch = true; //this.field.options.showSearch;
      const useServer = this.field.options.showSearch;
      return {
        fieldNames: this.fieldNames,
        showSearch,
        onPopupScroll: this.onPopupScroll,
        onSearch: showSearch ? this.remoteQuery : void 0,
        filterOption: !useServer && this.filterOption,
        listHeight: 120
      };
    }
  },
  methods: {
    filterOption(inputValue, option) {
      return option[this.fieldNames.label].toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
    },
    initPager() {
      this.pager = { page: 1, pageSize: 20, total: 0, totalPage: 0 };
      this.loadOptions([]);
    },
    remoteQuery(keyword) {
      const useServer = this.field.options.showSearch;
      if (!useServer) return;
      if (!!this.designState) {
        //设计状态不触发事件
        return;
      }

      // if (!!this.field.options.onRemoteQuery) {
      this.initPager();
      this.keyword = keyword;
      this.initOptionItems(true);
      // const remoteFn = new Function('keyword', this.field.options.onRemoteQuery);
      // remoteFn.call(this, keyword);
      // }
    },
    onPopupScroll(e) {
      if (!this.field.options.loadingPage) return;
      const { target } = e;
      const { scrollTop, scrollHeight, clientHeight } = target;
      if (scrollHeight - (scrollTop + clientHeight) <= 30) {
        if (this.pager.totalPage > this.pager.page) {
          if (this.pager.totalPage === this.pager.page) {
            return;
          }
          this.changePager();
        }
      }
    },
    changePager: debounce(function () {
      this.pager.page += 1;
      this.initOptionItems(true);
    }, 500)
  }
};
