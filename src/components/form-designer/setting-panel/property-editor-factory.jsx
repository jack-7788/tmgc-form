import { translate } from '@/utils/i18n';
import emitter from '@/utils/emitter';

export const createInputTextEditor = function (propName, propLabelKey) {
  return {
    props: {
      optionModel: Object
    },
    render(h) {
      return (
        <a-form-item label={translate(propLabelKey)}>
          <a-input type="text" v-model:value={this.optionModel[propName]} />
        </a-form-item>
      );
    }
  };
};

export const createInputNumberEditor = function (propName, propLabelKey) {
  return {
    props: {
      optionModel: Object
    },
    methods: {
      updateValue(newValue) {
        if (newValue === undefined || newValue === null || isNaN(newValue)) {
          this.optionModel[propName] = null;
        } else {
          this.optionModel[propName] = Number(newValue);
        }
      }
    },
    render(h) {
      return (
        <a-form-item label={translate(propLabelKey)}>
          <a-input-number
            type="text"
            v-model:value={this.optionModel[propName]}
            onChange={this.updateValue}
            style="width: 100%"
          />
        </a-form-item>
      );
    }
  };
};

export const createBooleanEditor = function (propName, propLabelKey) {
  return {
    props: {
      optionModel: Object
    },
    render(h) {
      return (
        <a-form-item label={translate(propLabelKey)}>
          <a-switch v-model:checked={this.optionModel[propName]} />
        </a-form-item>
      );
    }
  };
};

export const createCheckboxGroupEditor = function (propName, propLabelKey, configs) {
  return {
    props: {
      optionModel: Object
    },
    render(h) {
      return (
        <a-form-item label={translate(propLabelKey)}>
          <a-checkbox-group v-model:value={this.optionModel[propName]}>
            {configs.optionItems.map(item => {
              return <a-checkbox value={item.value}>{item.label}</a-checkbox>;
            })}
          </a-checkbox-group>
        </a-form-item>
      );
    }
  };
};

export const createRadioGroupEditor = function (propName, propLabelKey, configs) {
  return {
    props: {
      optionModel: Object
    },
    render(h) {
      return (
        <a-form-item label={translate(propLabelKey)}>
          <a-radio-group v-model:value={this.optionModel[propName]}>
            {configs.optionItems.map(item => {
              return <a-radio value={item.value}>{item.label}</a-radio>;
            })}
          </a-radio-group>
        </a-form-item>
      );
    }
  };
};

export const createRadioButtonGroupEditor = function (propName, propLabelKey, configs) {
  return {
    props: {
      optionModel: Object
    },
    render(h) {
      return (
        <a-form-item label={translate(propLabelKey)}>
          <a-radio-group v-model:value={this.optionModel[propName]}>
            {configs.optionItems.map(item => {
              return <a-radio-button value={item.value}>{item.label}</a-radio-button>;
            })}
          </a-radio-group>
        </a-form-item>
      );
    }
  };
};

export const createSelectEditor = function (propName, propLabelKey, configs) {
  return {
    props: {
      optionModel: Object
    },
    render(h) {
      return (
        <a-form-item label={translate(propLabelKey)}>
          <a-select v-model:value={this.optionModel[propName]}>
            {configs.optionItems.map(item => {
              return (
                <a-select-option label={item.label} value={item.value}>
                  {item.label}{' '}
                </a-select-option>
              );
            })}
          </a-select>
        </a-form-item>
      );
    }
  };
};

export const createEventHandlerEditor = function (eventPropName, eventParams) {
  return {
    props: {
      optionModel: Object
    },
    mixins: [emitter],
    methods: {
      editEventHandler() {
        this.dispatch('SettingPanel', 'editEventHandler', [eventPropName, [...eventParams]]);
      }
    },
    render(h) {
      return (
        <a-form-item label={eventPropName} label-width="150px">
          <a-button type="info" plain shape="round" onClick={this.editEventHandler}>
            {translate('designer.setting.addEventHandler')}
          </a-button>
        </a-form-item>
      );
    }
  };
};

export const createEmptyEditor = function () {
  return {
    render() {
      return <div style="display: none" />;
    }
  };
};
