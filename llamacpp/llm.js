import { initLlama } from 'llama.rn';

const context = await initLlama({
  model: '../guff/Llama-3.2-1B-Instruct-Q5_K_L.guff',
  use_mlock: true,
  n_ctx: 2048,
  n_gpu_layers: 1,
});

const stopWords = [
  '</s>',
  '<|end|>',
  '<|eot_id|>',
  '<|end_of_text|>',
  '<|im_end|>',
  '<|EOT|>',
  '<|END_OF_TURN_TOKEN|>',
  '<|end_of_turn|>',
  '<|endoftext|>',
];

const msgResult = await context.completion(
  {
    messages: [
      {
        role: 'system',
        content: 'This is a conversation between user and assistant, a friendly chatbot.',
      },
      {
        role: 'user',
        content: 'Hello!',
      },
    ],
    n_predict: 100,
    stop: stopWords,
  },
  (data) => {
    const { token } = data;
  }
);
console.log('Result:', msgResult.text);
console.log('Timings:', msgResult.timings);

const textResult = await context.completion(
  {
    prompt:
      'This is a conversation between user and llama, a friendly chatbot. respond in simple markdown.\n\nUser: Hello!\nLlama:',
    n_predict: 100,
    stop: [...stopWords, 'Llama:', 'User:'],
  },
  (data) => {
    const { token } = data;
  }
);
console.log('Result:', textResult.text);
console.log('Timings:', textResult.timings);
