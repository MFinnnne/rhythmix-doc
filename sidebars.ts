import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Sidebar configuration for Rhythmix documentation
 *
 * Rhythmix is a simple yet powerful rule expression engine for stream data processing.
 * This sidebar organizes the documentation to help users quickly find what they need.
 */
const sidebars: SidebarsConfig = {
    // Main documentation sidebar for Rhythmix
    rhythmixSidebar: [
        {
            type: 'doc',
            id: 'intro',
            label: 'Introduction',
        },
        {
            type: 'category',
            label: '🚀 Getting Started',
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    id: 'getting-started/installation',
                    label: 'Installation',
                },
                {
                    type: 'doc',
                    id: 'getting-started/quick-start',
                    label: 'Quick Start',
                },
                {
                    type: 'doc',
                    id: 'getting-started/basic-concepts',
                    label: 'Basic Concepts',
                },
            ],
        },
        {
            type: 'category',
            label: '📝 Expression Syntax',
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    id: 'expressions/overview',
                    label: 'Expression Syntax Overview',
                },
                {
                    type: 'doc',
                    id: 'expressions/comparison',
                    label: 'Comparison Expressions',
                },
                {
                    type: 'doc',
                    id: 'expressions/interval',
                    label: 'Interval Expressions',
                },
                {
                    type: 'doc',
                    id: 'expressions/logical',
                    label: 'Logical Expressions',
                },
                {
                    type: 'category',
                    label: 'Functions',
                    items: [
                        {
                            type: 'doc',
                            id: 'expressions/functions/count',
                            label: 'Count Function',
                        },
                        {
                            type: 'doc',
                            id: 'expressions/functions/count-strict',
                            label: 'Count! (Strict Count) Function',
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'Chain Expressions',
                    items: [
                        {
                            type: 'doc',
                            id: 'expressions/chain/overview',
                            label: 'Chain Expressions Overview',
                        },
                        {
                            type: 'doc',
                            id: 'expressions/chain/filter',
                            label: 'Filter',
                        },
                        {
                            type: 'doc',
                            id: 'expressions/chain/limit',
                            label: 'Limit',
                        },
                        {
                            type: 'doc',
                            id: 'expressions/chain/window',
                            label: 'Window',
                        },
                        {
                            type: 'doc',
                            id: 'expressions/chain/take',
                            label: 'Take',
                        },
                        {
                            type: 'doc',
                            id: 'expressions/chain/calculators',
                            label: 'Calculators',
                        },
                        {
                            type: 'doc',
                            id: 'expressions/chain/meet',
                            label: 'Meet',
                        },
                    ],
                },
            ],
        },
        {
            type: 'category',
            label: '🔧 Advanced Features',
            collapsed: true,
            items: [
                {
                    type: 'doc',
                    id: 'advanced/custom-filters',
                    label: 'Custom Filters',
                },
                {
                    type: 'doc',
                    id: 'advanced/custom-calculators',
                    label: 'Custom Calculators',
                },
                {
                    type: 'doc',
                    id: 'advanced/custom-meet-functions',
                    label: 'Custom Meet Functions',
                },
                {
                    type: 'doc',
                    id: 'advanced/state-transitions',
                    label: 'State Transitions',
                },
            ],
        },
        {
            type: 'category',
            label: '📚 API Reference',
            collapsed: true,
            items: [
                {
                    type: 'doc',
                    id: 'api/rhythmix-event-data',
                    label: 'RhythmixEventData',
                },
                {
                    type: 'doc',
                    id: 'api/rhythmix-compiler',
                    label: 'RhythmixCompiler',
                },
                {
                    type: 'doc',
                    id: 'api/rhythmix-executor',
                    label: 'RhythmixExecutor',
                },
            ],
        },
        {
            type: 'category',
            label: '💡 Examples & Use Cases',
            collapsed: true,
            items: [
                {
                    type: 'doc',
                    id: 'examples/temperature-monitoring',
                    label: 'Temperature Monitoring',
                },
                {
                    type: 'doc',
                    id: 'examples/production-quality',
                    label: 'Production Quality Control',
                },
                {
                    type: 'doc',
                    id: 'examples/network-monitoring',
                    label: 'Network Monitoring',
                },
                {
                    type: 'doc',
                    id: 'examples/sensor-data',
                    label: 'Sensor Data Processing',
                },
                {
                    type: 'doc',
                    id: 'examples/financial-risk',
                    label: 'Financial Risk Detection',
                },
                {
                    type: 'doc',
                    id: 'examples/medical-devices',
                    label: 'Medical Device Monitoring',
                },
            ],
        },
        {
            type: 'category',
            label: '📖 Appendix',
            collapsed: true,
            items: [
                {
                    type: 'doc',
                    id: 'appendix/comparison-examples',
                    label: 'Comparison Expression Examples',
                },
                {
                    type: 'doc',
                    id: 'appendix/interval-examples',
                    label: 'Interval Expression Examples',
                },
                {
                    type: 'doc',
                    id: 'appendix/logical-examples',
                    label: 'Logical Expression Examples',
                },
                {
                    type: 'doc',
                    id: 'appendix/best-practices',
                    label: 'Best Practices',
                },
                {
                    type: 'doc',
                    id: 'appendix/faq',
                    label: 'FAQ',
                },
            ],
        },
    ],

    // Tutorial sidebar (keeping the original for reference)
    tutorialSidebar: [{type: 'autogenerated', dirName: 'tutorial-basics'}],
};

export default sidebars;
