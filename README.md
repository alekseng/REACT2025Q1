# Performance Profiling Task

## before optimization

first render

![before optimization flamegraph](./profiler/image.png)
![before optimization flamegraph-1](./profiler/image-2.png)
![before optimization rancked chart](./profiler/image-1.png)
![before optimization rancked chart-1](./profiler/image-3.png)

filter by region

![before optimization flamegraph](./profiler/image-4.png)
![before optimization flamegraph-1](./profiler/image-5.png)

sorting by population

![before optimization flamegraph](./profiler/image-6.png)
![before optimization flamegraph-1](./profiler/image-7.png)

searching by name

![before optimization flamegraph](./profiler/image-8.png)
![before optimization flamegraph-1](./profiler/image-9.png)

## after optimization

first render

![before optimization flamegraph](./profiler/image-10.png)
![before optimization flamegraph-1](./profiler/image-11.png)
![before optimization rancked chart](./profiler/image-12.png)
![before optimization rancked chart-1](./profiler/image-13.png)

filter by region

![before optimization flamegraph](./profiler/image-14.png)
![before optimization flamegraph-1](./profiler/image-15.png)

sorting by population

![before optimization flamegraph](./profiler/image-16.png)
![before optimization flamegraph-1](./profiler/image-17.png)

searching by name

![before optimization flamegraph](./profiler/image-18.png)
![before optimization flamegraph-1](./profiler/image-19.png)

## Conclusion

| Components and actions | Before   | After   | Reduced   |
| ---------------------- | -------- | ------- | --------- |
| App render             | 14.7 ms  | 12.6 ms | 14.29 %   |
| CardList               | 106.3 ms | 53.4 ms | 49.76 %   |
| Filter by region       | 10.5 ms  | 3.3 ms  | 68.57 %   |
| sorting by population  | 20.8 ms  | 5.5 ms  | 73.56 %   |
| searching by name      | 1.9 ms   | 2 ms    | unchanged |
