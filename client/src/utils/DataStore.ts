/**
 * Unified global data store
 */

import * as _ from 'lodash'
import IMessage from '@/models/Message'
import IUser from '@/models/User'

export interface IDataStoreState {
  /**
   * Use channelId as key.
   */
  messages: Map<string, IMessage[]>
  contacts: IUser[]
}

export type DataStoreChangeHandler = (newState: IDataStoreState) => void

class DataStore {
  private state: IDataStoreState = {
    messages: new Map<string, IMessage[]>(),
    contacts: [],
  }
  private listeners = new Set<DataStoreChangeHandler>()

  addListener = (listener: DataStoreChangeHandler) =>
    this.listeners.add(listener)

  removeListener = (listener: DataStoreChangeHandler) =>
    this.listeners.delete(listener)

  /**
   * @return a deep copy of the state
   */
  getState = () => _.cloneDeep(this.state)

  /**
   * Acts like React.setState, can merge a partial state into the existing one.
   */
  setState = (newState: Partial<IDataStoreState>) => {
    _.mergeWith(this.state, newState)

    this.notifyAll()
  }

  private notifyAll = () => this.listeners.forEach(handle => handle(this.state))
}

// Singleton
export default new DataStore()
