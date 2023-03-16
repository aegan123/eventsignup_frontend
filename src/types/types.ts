import { components } from '@asteriskiry/eventsignup_backend-types/'

export type Event = components['schemas']['Event']
export type EventBasicInformation = Omit<Event, 'form'>
export type Quota = components['schemas']['Quota']
