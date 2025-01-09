import { defineStore } from 'pinia'

export const useQueueStore = defineStore('queue', {
    state: () => ({
        // Параметры системы
        servers: 2,
        maxQueueLength: 10,
        arrivalRate: 0.3,
        serviceRate: 0.2,
        isRunning: false,

        // Текущее состояние
        queue: [],
        serverStatus: [],

        // Статистика
        statistics: {
            totalCustomers: 0,
            servedCustomers: 0,
            rejectedCustomers: 0,
            averageWaitTime: 0,
            queueLength: 0,
            serverUtilization: 0
        },

        // История для графиков
        history: {
            queueLength: [],
            serverUtilization: [],
            timestamps: []
        }
    }),

    actions: {
        initialize() {
            console.log('Store: Initializing with servers:', this.servers);
            this.serverStatus = new Array(this.servers).fill(false);
            this.queue = [];
            this.resetStatistics();
        },

        resetStatistics() {
            console.log('Store: Resetting statistics');
            this.statistics = {
                totalCustomers: 0,
                servedCustomers: 0,
                rejectedCustomers: 0,
                averageWaitTime: 0,
                queueLength: 0,
                serverUtilization: 0
            };
            this.history = {
                queueLength: [],
                serverUtilization: [],
                timestamps: []
            };
        },

        addCustomer() {
            console.log('Store: Adding customer');
            this.statistics.totalCustomers++;
            const freeServer = this.serverStatus.indexOf(false);

            if (freeServer !== -1) {
                console.log('Store: Found free server:', freeServer);
                this.serverStatus[freeServer] = true;
                this.statistics.servedCustomers++;
                return true;
            } else if (this.queue.length < this.maxQueueLength) {
                console.log('Store: Adding to queue, current length:', this.queue.length);
                this.queue.push({
                    arrivalTime: Date.now()
                });
                return true;
            } else {
                console.log('Store: Customer rejected');
                this.statistics.rejectedCustomers++;
                return false;
            }
        },

        processServer() {
            console.log('Store: Processing servers');
            const busyServer = this.serverStatus.indexOf(true);
            if (busyServer !== -1) {
                if (this.queue.length > 0) {
                    console.log('Store: Processing customer from queue');
                    const customer = this.queue.shift();
                    const waitTime = Date.now() - customer.arrivalTime;
                    this.updateAverageWaitTime(waitTime);
                } else {
                    console.log('Store: Freeing server:', busyServer);
                    this.serverStatus[busyServer] = false;
                }
            }

            this.updateStatistics();
        },

        updateAverageWaitTime(newWaitTime) {
            console.log('Store: Updating average wait time:', newWaitTime);
            const total = this.statistics.averageWaitTime * this.statistics.servedCustomers + newWaitTime;
            this.statistics.averageWaitTime = total / (this.statistics.servedCustomers + 1);
        },

        updateStatistics() {
            console.log('Store: Updating statistics');
            const timestamp = new Date().toISOString();
            const busyServers = this.serverStatus.filter(status => status).length;

            this.statistics.queueLength = this.queue.length;
            this.statistics.serverUtilization = busyServers / this.servers;

            this.history.queueLength.push(this.statistics.queueLength);
            this.history.serverUtilization.push(this.statistics.serverUtilization);
            this.history.timestamps.push(timestamp);

            if (this.history.timestamps.length > 100) {
                this.history.queueLength.shift();
                this.history.serverUtilization.shift();
                this.history.timestamps.shift();
            }
            console.log('Store: Current statistics:', this.statistics);
        },

        toggleSimulation() {
            console.log('Store: Toggle simulation from', this.isRunning, 'to', !this.isRunning);
            this.isRunning = !this.isRunning;
        }
    }
})