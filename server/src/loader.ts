import {
    Provider,
    ReflectiveInjector,
    ResolvedReflectiveProvider
} from 'injection-js';

class Loader {
    private providers: ResolvedReflectiveProvider[] = [];

    addProviders(providers: Provider[]): void {
        this.providers.push(...ReflectiveInjector.resolve(providers));
    }

    resolve(providers?: Provider[]): ReflectiveInjector {
        const injector = ReflectiveInjector.fromResolvedProviders(this.providers);
        return providers
            ? ReflectiveInjector.resolveAndCreate(providers, injector)
            : injector;
    }
}

export default new Loader;
