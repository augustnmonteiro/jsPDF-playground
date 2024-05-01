import { StarIcon } from '@heroicons/react/24/solid';
import Editor from '@monaco-editor/react';
import { Box, Flex } from '@radix-ui/themes';
import { Resizable } from 're-resizable';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import { codeExamples } from './codeExamples';
import { Config } from './config';

import('jspdf').then((module) => {
  (window as any).jsPDF = module.jsPDF;
});

function App() {

  const [code, setCode] = useState('');
  const [pdfBlobUrl, setPdfBlobUrl] = useState('');
  const debounceTimerRef = useRef<number | null>(null);

  const renderPDF = () => {
    try {
      if (pdfBlobUrl) {
        URL.revokeObjectURL(pdfBlobUrl);
      }
      console.log(code)
      const url = eval(code || "");
      setPdfBlobUrl(url);
      console.log(url);
    } catch (error) {
      console.error(error);
    }
  }

  function onChange(value: string | undefined, _: any): void {
    setCode(value || "");
  }

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = window.setTimeout(() => {
      renderPDF();
    }, Config.debounceTime);
  }, [code]);

  useEffect(() => {
    setCode(codeExamples.sections);
  }, []);

  return (
    <>
      <Flex style={{ height: '100vh', flexDirection: 'column' }}>
        <Box style={{ 
          boxSizing: 'border-box', 
          flexDirection: 'row', 
          display: 'flex', 
          maxHeight: '50px', 
          flex: 1
          }} className='bg-gray-700 text-white items-center'>
            <span className='ml-5'>jsPDF Playground</span>
            <a href='https://github.com/augustnmonteiro/jsPDF-playground'
               target='_blank'
               className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center justify-center ml-4 cursor-pointer">
              <StarIcon className="h-4 w-4 mr-2" />
              <span>Star on GitHub</span>
            </a>
        </Box>
        <Box style={{ boxSizing: 'border-box', flexDirection: 'row', display: 'flex', flex: 1 }}>
          <Resizable
            defaultSize={{
              width: '50%',
              height: '100%'
            }}
            style={{ display: 'flex' }}
            minWidth="20%"
            maxWidth="80%"

          >
            <Editor className='w-full h-full'
                    defaultLanguage={Config.editor.defaultLanguage} 
                    value={code} 
                    onChange={onChange}
                    options={Config.editor.options}
                    />
          </Resizable>
          <Box flexGrow="1">
            <iframe title="pdf" src={pdfBlobUrl} className='w-full h-full' style={{
              height: '100%',
              width: '100%',
            }}/>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default App
