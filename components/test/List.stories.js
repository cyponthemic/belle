import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import List from './List'
import store from '@/.storybook/store'


storiesOf('List', module)
  .add('As a component', () => ({
    store: store,
    template: '<List source="comments" />'
  }))
