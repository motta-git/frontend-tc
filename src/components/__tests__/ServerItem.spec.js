import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useServerStore } from '@/stores/serverStore'
import ServerItem from '../ServerItem.vue'

window.confirm = () => true;

describe('ServerItem.vue', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('renders server information correctly', () => {
        const mockServer = {
            id: 1,
            host: 'test-server.com',
            ip: '192.168.1.100',
            description: 'A test server.',
            image_url: 'http://example.com/image.png'
        }

        const wrapper = mount(ServerItem, {
            props: {
                server: mockServer
            }
        })

        const text = wrapper.text()
        expect(text).toContain(mockServer.host)
        expect(text).toContain(mockServer.ip)
    })

    it('calls the delete action when delete button is clicked', async () => {
        const store = useServerStore();
        const deleteSpy = vi.spyOn(store, 'deleteServer');
        const mockServer = { id: 1, host: 'test.com', ip: '1.1.1.1' };

        const wrapper = mount(ServerItem, {
            props: { server: mockServer },
        });

        await wrapper.find('button.delete-btn').trigger('click');

        expect(deleteSpy).toHaveBeenCalledWith(1);
    })
})