import { ProfessionalModule } from '@/types/enhancedContentTypes';

export const javaScriptCSSFoundationsModule: ProfessionalModule = {
  id: 'javascript-css-foundations',
  title: 'JavaScript & CSS Foundations',
  description: 'Master modern JavaScript (ES6+) and advanced CSS techniques to build production-ready, responsive web applications with industry best practices.',
  duration_minutes: 240,
  difficulty_level: 'intermediate',
  learning_objectives: [
    'Master ES6+ features including arrow functions, destructuring, spread operators, and async/await',
    'Implement advanced CSS layouts using Flexbox, Grid, and modern responsive design patterns',
    'Build interactive components with vanilla JavaScript and DOM manipulation',
    'Apply CSS architecture methodologies (BEM, SMACSS) for maintainable stylesheets',
    'Optimize performance and implement cross-browser compatibility solutions',
    'Create production-ready components following industry best practices'
  ],
  prerequisites: [
    'Basic HTML knowledge and document structure understanding',
    'Fundamental programming concepts (variables, functions, loops)',
    'Basic CSS syntax and selectors familiarity',
    'Text editor setup and browser developer tools usage'
  ],
  target_audience: [
    'Junior developers transitioning to modern JavaScript',
    'Self-taught developers seeking structured foundation',
    'Bootcamp graduates preparing for professional roles',
    'Career changers entering web development',
    'Frontend developers updating legacy skill sets'
  ],
  industry_applications: [
    'Building responsive single-page applications (SPAs)',
    'Creating reusable component libraries',
    'Developing mobile-first responsive websites',
    'Implementing interactive dashboards and data visualizations',
    'Maintaining and modernizing legacy codebases'
  ],
  competency_level: {
    entry_level: 'Basic HTML/CSS knowledge with limited JavaScript experience',
    target_level: 'Proficient in modern ES6+ JavaScript and advanced CSS with production-ready skills',
    mastery_indicators: [
      'Can build complex interactive components from scratch',
      'Implements responsive layouts using modern CSS techniques',
      'Writes clean, maintainable code following industry standards',
      'Debugs cross-browser compatibility issues effectively',
      'Optimizes performance and follows accessibility best practices'
    ]
  },
  content_sections: [
    {
      id: 'modern-javascript-essentials',
      title: 'Modern JavaScript (ES6+) Essentials',
      type: 'interactive',
      duration_minutes: 75,
      description: 'Deep dive into ES6+ features that transformed JavaScript development, with hands-on practice and real-world application patterns.',
      is_required: true,
      order_index: 1,
      learning_outcomes: [
        'Write concise code using arrow functions and template literals',
        'Destructure objects and arrays efficiently',
        'Use spread/rest operators for flexible function parameters',
        'Implement async/await for clean asynchronous code',
        'Apply modern array methods (map, filter, reduce) effectively'
      ],
      content_blocks: [
        {
          id: 'es6-overview',
          type: 'text',
          content: `Modern JavaScript (ES6 and beyond) revolutionized web development by introducing features that make code more readable, maintainable, and powerful. These features are now standard in professional development environments and form the foundation of modern frameworks like React, Vue, and Angular.

**Why ES6+ Matters in Professional Development:**

In modern development teams, ES6+ isn't optional—it's expected. Job postings routinely require "ES6+ proficiency," and code reviews will flag outdated ES5 patterns. More importantly, these features enable you to write code that's easier to understand, test, and maintain at scale.

**Key Transformation Areas:**

1. **Function Syntax**: Arrow functions provide concise syntax and lexical 'this' binding, eliminating common pitfalls with function context.

2. **Data Handling**: Destructuring and spread operators reduce boilerplate code and make data manipulation intuitive and readable.

3. **Asynchronous Programming**: Async/await transforms callback hell into linear, readable code that's easier to debug and maintain.

4. **Module System**: ES6 modules enable true code organization and reusability, replacing older patterns like CommonJS and AMD.`,
          order_index: 1
        },
        {
          id: 'es6-key-points',
          type: 'key_points',
          title: 'Essential ES6+ Features',
          content: [
            '**Arrow Functions**: Concise syntax with lexical this binding - perfect for callbacks and functional programming',
            '**Destructuring**: Extract values from objects/arrays elegantly, reducing variable declarations by 50%',
            '**Template Literals**: String interpolation and multi-line strings using backticks for readable code',
            '**Spread/Rest Operators**: (...) syntax for copying arrays, merging objects, and flexible function parameters',
            '**Async/Await**: Write asynchronous code that reads like synchronous code, improving error handling',
            '**Modules**: Import/export syntax for code organization and dependency management',
            '**Enhanced Object Literals**: Shorthand properties and computed property names for cleaner objects',
            '**Array Methods**: map(), filter(), reduce(), find() for functional data transformations'
          ],
          order_index: 2
        },
        {
          id: 'arrow-functions-framework',
          type: 'framework',
          content: {
            id: 'arrow-function-adoption',
            name: 'Arrow Function Decision Framework',
            description: 'A practical guide for when and how to use arrow functions effectively in professional codebases.',
            steps: [
              {
                step_number: 1,
                title: 'Identify Function Purpose',
                description: 'Determine whether the function needs its own `this` context or should inherit from surrounding scope.',
                key_actions: [
                  'Check if function is a method that needs to reference the object',
                  'Identify if function is a callback or event handler',
                  'Assess if function will be used as a constructor'
                ],
                examples: [
                  '// ✅ Good: Callback inherits this\narray.map(item => this.processItem(item))',
                  '// ❌ Bad: Method needs own this\nconst obj = { name: "test", greet: () => console.log(this.name) }'
                ]
              },
              {
                step_number: 2,
                title: 'Choose Appropriate Syntax',
                description: 'Select between concise and block body syntax based on function complexity.',
                key_actions: [
                  'Use concise body for simple single expressions',
                  'Use block body when multiple statements needed',
                  'Add parentheses for implicit object returns'
                ],
                examples: [
                  '// Concise: const double = x => x * 2',
                  '// Block: const process = x => { const result = x * 2; return result; }',
                  '// Object return: const makeObj = () => ({ key: "value" })'
                ]
              },
              {
                step_number: 3,
                title: 'Handle Parameters Correctly',
                description: 'Apply proper parameter syntax for different argument counts.',
                key_actions: [
                  'Omit parentheses for single parameter',
                  'Use parentheses for zero or multiple parameters',
                  'Implement destructuring in parameters when appropriate'
                ],
                examples: [
                  'const single = item => item * 2',
                  'const multiple = (a, b) => a + b',
                  'const destructured = ({ name, age }) => `${name} is ${age}`'
                ]
              },
              {
                step_number: 4,
                title: 'Optimize for Readability',
                description: 'Balance conciseness with clarity for team collaboration.',
                key_actions: [
                  'Add explicit returns for complex logic',
                  'Use descriptive parameter names',
                  'Break long chains into named intermediate functions'
                ],
                examples: [
                  '// Clear: const isValid = user => user.age >= 18 && user.verified',
                  '// Better: const isAdult = user => user.age >= 18;\nconst isVerified = user => user.verified;'
                ]
              }
            ],
            when_to_use: 'Use arrow functions for callbacks, array methods, functional programming patterns, and any function that needs to inherit the surrounding this context. Avoid for object methods, constructors, and functions that need arguments object.',
            benefits: [
              'Lexical this binding eliminates common context bugs',
              'Concise syntax reduces code verbosity by 30-50%',
              'Natural fit for functional programming patterns',
              'Improved readability in callback chains',
              'No need for .bind(), .call(), or .apply() for this context'
            ],
            common_pitfalls: [
              'Using arrow functions as object methods loses this context',
              'Cannot be used as constructors (no new keyword)',
              'No arguments object (use rest parameters instead)',
              'Implicit returns can hide errors in complex expressions',
              'Over-using concise syntax reduces readability for complex logic'
            ]
          },
          order_index: 3
        }
      ],
      case_studies: [
        {
          id: 'async-refactor-case',
          title: 'Refactoring Callback Hell with Async/Await',
          scenario: 'A legacy e-commerce application has a checkout process with nested callbacks for validating inventory, processing payment, and sending confirmation emails. The code is difficult to debug and maintain.',
          background: 'The application was built 5 years ago using callback-based APIs. New team members struggle to understand the flow, and error handling is inconsistent across different callback levels.',
          challenge: 'Transform the nested callback structure into readable async/await code while maintaining backward compatibility and improving error handling.',
          context: {
            industry: 'E-commerce',
            company_size: 'Mid-size (50-200 employees)',
            timeline: '2-week sprint'
          },
          analysis_points: [
            'Original code had 4 levels of nesting, making logic flow difficult to follow',
            'Error handling was scattered with multiple try-catch blocks at different levels',
            'Testing was difficult due to tight coupling between async operations',
            'Team velocity decreased as developers avoided touching the checkout code',
            'Customer support tickets increased due to unclear error messages'
          ],
          discussion_questions: [
            'What are the main advantages of async/await over callbacks for complex workflows?',
            'How would you handle parallel async operations (e.g., validating stock for multiple items)?',
            'What error handling strategy would you implement for the refactored code?',
            'How would you test async/await code compared to callback-based code?',
            'What migration strategy would you use to avoid breaking existing functionality?'
          ],
          key_takeaways: [
            'Async/await makes asynchronous code read like synchronous code, improving maintainability',
            'Use Promise.all() for parallel operations to improve performance',
            'Implement try-catch blocks at appropriate levels for clear error handling',
            'Extract async operations into separate functions for better testing',
            'Consider using async IIFE patterns for initialization code'
          ],
          related_concepts: [
            'Promise chaining and error propagation',
            'Parallel vs sequential async operations',
            'Error handling best practices',
            'Testing async code with Jest or Mocha',
            'Performance implications of async patterns'
          ]
        },
        {
          id: 'data-transformation-case',
          title: 'API Response Transformation with Modern Array Methods',
          scenario: 'A dashboard application receives complex nested data from multiple APIs and needs to transform, filter, and aggregate the data for visualization components.',
          background: 'The development team was using imperative for-loops and temporary variables, making the data transformation logic verbose and error-prone.',
          challenge: 'Rewrite data transformation logic using functional array methods (map, filter, reduce) to improve code clarity and reduce bugs.',
          context: {
            industry: 'SaaS Analytics',
            company_size: 'Startup (10-50 employees)',
            timeline: '1-week refactor'
          },
          analysis_points: [
            'Original code used nested for-loops spanning 100+ lines',
            'Temporary variables and mutation made debugging difficult',
            'Side effects in loops caused hard-to-trace bugs',
            'Code reviews took longer due to complex imperative logic',
            'New features required significant code changes'
          ],
          discussion_questions: [
            'When should you use map vs forEach for transforming data?',
            'How can reduce() replace multiple separate array operations?',
            'What are the performance trade-offs of chaining multiple array methods?',
            'How would you handle errors in functional transformation pipelines?',
            'What testing strategies work best for functional data transformations?'
          ],
          key_takeaways: [
            'Functional array methods create self-documenting, declarative code',
            'Chaining methods (map → filter → reduce) creates readable pipelines',
            'Immutable transformations prevent side-effect bugs',
            'Method chaining reduces intermediate variable declarations',
            'Consider performance for large datasets (use regular loops if needed)'
          ],
          related_concepts: [
            'Functional programming principles',
            'Immutability and pure functions',
            'Method chaining best practices',
            'Performance optimization for large arrays',
            'Lodash/Ramda for advanced functional patterns'
          ]
        }
      ],
      interactive_elements: [
        {
          id: 'es6-syntax-practice',
          title: 'ES6 Syntax Transformation Exercise',
          type: 'skill_practice',
          instructions: 'Convert the following ES5 code snippets to modern ES6+ syntax. Focus on arrow functions, destructuring, template literals, and modern array methods.',
          reflection_prompts: [
            'Which ES6 feature provided the most significant improvement in readability?',
            'What challenges did you encounter when converting callback patterns?',
            'How does destructuring reduce the amount of code you need to write?',
            'In what scenarios might ES5 syntax still be preferable?'
          ],
          success_criteria: [
            'All var declarations converted to const/let appropriately',
            'Functions converted to arrow functions where beneficial',
            'String concatenation replaced with template literals',
            'Repetitive object property assignments simplified with destructuring',
            'Array transformations use map/filter/reduce instead of loops'
          ]
        },
        {
          id: 'async-debugging-exercise',
          title: 'Async/Await Debugging Challenge',
          type: 'decision_making',
          instructions: 'Review code samples with common async/await mistakes. Identify the issues and propose corrections.',
          scenarios: [
            {
              id: 'missing-await',
              situation: 'A function calls an async operation but forgets the await keyword, causing unexpected behavior.',
              options: [
                {
                  text: 'Add await keyword before the async call',
                  outcome: 'Correct - function now waits for the promise to resolve',
                  feedback: '✅ Great! Always use await with async functions to ensure proper execution order.'
                },
                {
                  text: 'Convert function to use .then() instead',
                  outcome: 'Works but defeats the purpose of async/await',
                  feedback: '⚠️ While functional, this reverts to promise chaining. Stick with async/await for consistency.'
                },
                {
                  text: 'Remove async keyword from function declaration',
                  outcome: 'Error - await can only be used in async functions',
                  feedback: '❌ Removing async causes a syntax error. Functions using await must be marked async.'
                }
              ]
            },
            {
              id: 'sequential-vs-parallel',
              situation: 'Three independent API calls are executed sequentially with await, causing slow performance.',
              options: [
                {
                  text: 'Use Promise.all() to execute calls in parallel',
                  outcome: 'Excellent - reduces total time from 3s to 1s',
                  feedback: '✅ Perfect! Promise.all() is ideal for independent parallel operations.'
                },
                {
                  text: 'Remove await and handle promises manually',
                  outcome: 'Works but loses async/await benefits',
                  feedback: '⚠️ While this works, it reduces code readability. Use Promise.all() with await instead.'
                },
                {
                  text: 'Keep sequential execution for safety',
                  outcome: 'Unnecessarily slow for independent operations',
                  feedback: '❌ When operations are independent, parallel execution is safe and much faster.'
                }
              ]
            }
          ],
          reflection_prompts: [
            'How do you identify opportunities for parallel async execution?',
            'What error handling patterns work best with async/await?',
            'When would sequential execution be necessary despite performance impact?'
          ],
          success_criteria: [
            'Correctly identify missing await keywords',
            'Recognize opportunities for Promise.all() optimization',
            'Understand error handling with try-catch in async functions',
            'Can explain when to use sequential vs parallel execution'
          ]
        }
      ],
      assessment_questions: [
        {
          id: 'arrow-function-this',
          type: 'multiple_choice',
          question: 'Why would using an arrow function as an object method cause unexpected behavior?',
          options: [
            'Arrow functions cannot be used in objects',
            'Arrow functions do not have their own `this` binding and inherit from surrounding scope',
            'Arrow functions are always slower than regular functions',
            'Arrow functions cannot access object properties'
          ],
          correct_answer: 1,
          explanation: 'Arrow functions use lexical `this` binding, meaning they inherit `this` from the surrounding scope rather than creating their own. For object methods that need to reference the object itself, regular functions are required.'
        },
        {
          id: 'async-await-scenario',
          type: 'scenario_based',
          question: 'You need to fetch user data, then fetch that user\'s posts, and finally fetch comments for each post. The posts can be fetched independently, but comments depend on post data. How would you structure this with async/await?',
          scenario: 'You are building a social media profile page that needs to load user information, their posts, and comments on those posts. Performance is critical for user experience.',
          evaluation_criteria: [
            'Correctly identifies sequential dependency (user → posts)',
            'Recognizes opportunity for parallel fetching of comments across posts',
            'Implements proper error handling for each async operation',
            'Uses Promise.all() for parallel operations where appropriate',
            'Considers loading states and progressive data display'
          ]
        },
        {
          id: 'destructuring-benefit',
          type: 'multiple_choice',
          question: 'What is the primary benefit of using destructuring when working with function parameters?',
          options: [
            'It makes the code run faster',
            'It clearly documents which properties the function uses and reduces boilerplate',
            'It prevents the function from being called incorrectly',
            'It automatically validates the input data'
          ],
          correct_answer: 1,
          explanation: 'Destructuring in function parameters serves as self-documentation, showing exactly which properties are used. It also eliminates repetitive property access (obj.prop) throughout the function body, making code cleaner and more maintainable.'
        }
      ],
      practical_applications: [
        'Transform callback-based APIs to modern async/await patterns',
        'Refactor complex data transformations using functional array methods',
        'Build reusable utility functions with arrow functions and destructuring',
        'Implement clean async error handling in API service layers',
        'Create maintainable code that follows modern JavaScript standards'
      ],
      additional_resources: [
        {
          title: 'MDN JavaScript Reference - ES6 Features',
          type: 'article',
          description: 'Comprehensive documentation of all ES6+ features with examples',
          internal: false
        },
        {
          title: 'JavaScript.info - Modern JavaScript Tutorial',
          type: 'article',
          description: 'In-depth tutorial covering modern JavaScript from basics to advanced',
          internal: false
        },
        {
          title: 'ESLint Rules for ES6+',
          type: 'tool',
          description: 'Configure linting rules to enforce modern JavaScript practices',
          internal: false
        }
      ]
    },
    {
      id: 'advanced-css-layouts',
      title: 'Advanced CSS: Flexbox, Grid & Responsive Design',
      type: 'interactive',
      duration_minutes: 80,
      description: 'Master modern CSS layout systems including Flexbox and Grid, with practical responsive design patterns used in production applications.',
      is_required: true,
      order_index: 2,
      learning_outcomes: [
        'Build complex layouts using CSS Grid and Flexbox appropriately',
        'Implement mobile-first responsive design strategies',
        'Create fluid layouts that adapt to any screen size',
        'Apply CSS custom properties (variables) for maintainable themes',
        'Optimize layout performance and avoid common pitfalls'
      ],
      content_blocks: [
        {
          id: 'modern-css-intro',
          type: 'text',
          content: `Modern CSS layout systems have revolutionized how we build responsive web applications. Flexbox and Grid replaced float-based layouts and positioning hacks, providing powerful, intuitive tools for creating complex layouts with minimal code.

**The Layout Revolution:**

Before Flexbox (2015) and Grid (2017), developers struggled with float-based layouts, clearfix hacks, and complex positioning. These modern layout systems provide:

- **Flexbox**: Perfect for one-dimensional layouts (rows or columns) and component-level layouts
- **Grid**: Ideal for two-dimensional layouts and page-level structure
- **Custom Properties**: CSS variables for dynamic theming and DRY principles

**Industry Impact:**

Major companies completely overhauled their CSS architecture after Grid and Flexbox achieved widespread browser support. Development time for complex layouts decreased by 40-60%, and responsive design became significantly more maintainable.

**When to Use Each:**

- **Flexbox**: Navigation bars, card layouts, form inputs, centering content, distributing space
- **Grid**: Page layouts, dashboards, image galleries, magazine-style layouts, complex overlapping designs
- **Combination**: Most production applications use both - Grid for macro layout, Flexbox for micro components`,
          order_index: 1
        },
        {
          id: 'flexbox-grid-key-points',
          type: 'key_points',
          title: 'Flexbox vs Grid: Decision Matrix',
          content: [
            '**Flexbox for Content-First Design**: Use when content size should control layout (navigation, cards)',
            '**Grid for Layout-First Design**: Use when layout structure should control content placement (page layouts)',
            '**Flexbox Properties**: justify-content, align-items, flex-direction, flex-wrap, gap',
            '**Grid Properties**: grid-template-columns, grid-template-rows, grid-gap, grid-area, auto-fit/auto-fill',
            '**Mobile-First Approach**: Start with single-column mobile layout, add complexity for larger screens',
            '**Responsive Units**: Use fr units in Grid, avoid fixed pixel widths, leverage clamp() for fluid typography',
            '**Performance**: Both Flexbox and Grid are highly optimized; avoid nesting 10+ levels deep',
            '**Browser Support**: Both have excellent support (95%+); use @supports for progressive enhancement'
          ],
          order_index: 2
        },
        {
          id: 'responsive-framework',
          type: 'framework',
          content: {
            id: 'mobile-first-framework',
            name: 'Mobile-First Responsive Design Framework',
            description: 'A systematic approach to building responsive layouts that scale seamlessly from mobile to desktop.',
            steps: [
              {
                step_number: 1,
                title: 'Start with Mobile Base Styles',
                description: 'Design for smallest screens first (320px-375px), using single-column layouts and stacked elements.',
                key_actions: [
                  'Set default font size to 16px for mobile readability',
                  'Use flexible units (rem, em, %) instead of fixed pixels',
                  'Implement touch-friendly button sizes (minimum 44x44px)',
                  'Start with vertical stacking (flex-direction: column)'
                ],
                examples: [
                  '/* Mobile base styles */\n.container { padding: 1rem; }\n.button { padding: 0.75rem 1.5rem; min-height: 44px; }',
                  '.card { display: flex; flex-direction: column; gap: 1rem; }'
                ]
              },
              {
                step_number: 2,
                title: 'Add Tablet Breakpoint (768px)',
                description: 'Introduce two-column layouts and utilize horizontal space more efficiently.',
                key_actions: [
                  'Convert single-column to two-column grid where appropriate',
                  'Increase spacing and padding for larger screens',
                  'Introduce horizontal navigation if vertical on mobile',
                  'Adjust font sizes with clamp() for fluid scaling'
                ],
                examples: [
                  '@media (min-width: 768px) {\n  .grid { grid-template-columns: repeat(2, 1fr); }\n  .container { padding: 2rem; }\n}',
                  '@media (min-width: 768px) {\n  .nav { flex-direction: row; }\n}'
                ]
              },
              {
                step_number: 3,
                title: 'Optimize for Desktop (1024px+)',
                description: 'Utilize full screen width with three+ column layouts and enhanced spacing.',
                key_actions: [
                  'Implement multi-column grids (3-4 columns)',
                  'Add max-width constraints for readability (1200-1400px)',
                  'Enhance spacing and typography for comfortable viewing',
                  'Consider sidebar layouts and multi-panel designs'
                ],
                examples: [
                  '@media (min-width: 1024px) {\n  .grid { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }\n  .main { max-width: 1200px; margin: 0 auto; }\n}',
                  '@media (min-width: 1024px) {\n  .layout { display: grid; grid-template-columns: 250px 1fr; }\n}'
                ]
              },
              {
                step_number: 4,
                title: 'Test and Refine Breakpoints',
                description: 'Test on real devices and adjust breakpoints based on content, not device sizes.',
                key_actions: [
                  'Test on actual mobile devices, not just browser DevTools',
                  'Add custom breakpoints where content breaks',
                  'Use Chrome DevTools device mode for quick testing',
                  'Validate with accessibility tools (keyboard navigation, screen readers)'
                ],
                examples: [
                  '/* Content-based breakpoint */\n@media (min-width: 550px) {\n  .feature-cards { grid-template-columns: repeat(2, 1fr); }\n}',
                  '/* Test queries: @supports, prefers-reduced-motion, prefers-color-scheme */'
                ]
              }
            ],
            when_to_use: 'Apply this framework for all new web projects and when refactoring legacy layouts. Mobile-first ensures your design works on the most constrained devices and progressively enhances for larger screens.',
            benefits: [
              'Ensures optimal mobile experience (60%+ of web traffic)',
              'Reduces CSS complexity by building on simple base',
              'Improves performance - mobile styles load first',
              'Forces focus on content hierarchy and priority',
              'Easier to add features than remove for mobile'
            ],
            common_pitfalls: [
              'Using max-width media queries (desktop-first) - harder to maintain',
              'Too many breakpoints (stick to 3-4 major ones)',
              'Fixed pixel widths prevent proper scaling',
              'Ignoring touch targets and mobile interaction patterns',
              'Not testing on actual mobile devices'
            ]
          },
          order_index: 3
        }
      ],
      case_studies: [
        {
          id: 'dashboard-grid-layout',
          title: 'Building a Responsive Analytics Dashboard with CSS Grid',
          scenario: 'A SaaS company needs a complex analytics dashboard with multiple panels, charts, and data tables that must work on mobile tablets (iPad) through desktop displays.',
          background: 'Previous dashboard used float-based layout with media queries, requiring 800+ lines of CSS and constant maintenance as new widgets were added.',
          challenge: 'Redesign the dashboard using CSS Grid to create a flexible, maintainable layout system that adapts to various screen sizes and allows easy widget rearrangement.',
          context: {
            industry: 'SaaS Analytics',
            company_size: 'Series B Startup (50-100 employees)',
            timeline: '3-week design and implementation'
          },
          analysis_points: [
            'Original layout had 800+ lines of CSS with deeply nested selectors',
            'Adding new dashboard widgets required changes in 10+ places',
            'Mobile experience was an afterthought, leading to poor UX',
            'Designers couldn\'t easily prototype layout changes',
            'Team spent 20% of sprint time fixing layout bugs'
          ],
          discussion_questions: [
            'How would you structure grid areas to allow drag-and-drop widget rearrangement?',
            'What grid properties would you use for responsive widget sizing?',
            'How would you handle the transition from multi-column desktop to single-column mobile?',
            'What CSS custom properties would make the layout system more maintainable?',
            'How would you ensure accessibility with a complex grid layout?'
          ],
          key_takeaways: [
            'CSS Grid reduced layout code by 60% while increasing flexibility',
            'Named grid areas make layout intent clear and maintainable',
            'Grid auto-fit/auto-fill enables responsive designs without media queries',
            'Combining Grid (macro) and Flexbox (micro) creates robust layouts',
            'Grid template areas provide visual representation of layout in code'
          ],
          related_concepts: [
            'CSS Grid subgrid for nested layouts',
            'Grid gap vs margin for consistent spacing',
            'Implicit vs explicit grid tracks',
            'Grid area naming conventions',
            'Performance considerations for complex grids'
          ]
        },
        {
          id: 'ecommerce-flexbox',
          title: 'E-commerce Product Card Layout with Flexbox',
          scenario: 'An online retailer needs a flexible product card component that handles varying image sizes, product titles of different lengths, and optional badges/tags while maintaining visual consistency.',
          background: 'Original cards used absolute positioning and fixed heights, causing content overflow and visual inconsistencies when product data varied.',
          challenge: 'Build a robust product card using Flexbox that gracefully handles content variations while maintaining consistent spacing and alignment.',
          context: {
            industry: 'E-commerce Fashion',
            company_size: 'Mid-size (200+ employees)',
            timeline: '1-week sprint'
          },
          analysis_points: [
            'Fixed-height cards caused image cropping and text overflow',
            'Absolute positioning made cards fragile and hard to modify',
            'Adding new elements (badges, ratings) broke existing layouts',
            'Cards looked inconsistent across product listings',
            'Mobile layout required completely separate CSS'
          ],
          discussion_questions: [
            'How does flex-grow and flex-shrink help with variable content heights?',
            'What Flexbox properties ensure consistent button placement at card bottom?',
            'How would you handle horizontal product grids vs vertical mobile lists?',
            'What\'s the best way to center variable-height images within cards?',
            'How can gap property simplify spacing compared to margins?'
          ],
          key_takeaways: [
            'Flexbox flex-direction switch handles mobile/desktop layouts elegantly',
            'Using flex: 1 on content areas ensures consistent card heights',
            'Flexbox gap property simplifies spacing logic significantly',
            'justify-content and align-items reduce positioning complexity',
            'Flex-wrap enables responsive grid without media queries'
          ],
          related_concepts: [
            'Flexbox order property for visual reordering',
            'Flex-basis for predictable sizing',
            'Combining Flexbox with aspect-ratio for images',
            'Accessibility considerations in flex layouts',
            'Performance of flex vs grid for card layouts'
          ]
        }
      ],
      interactive_elements: [
        {
          id: 'flexbox-froggy-challenge',
          title: 'Flexbox Layout Challenge',
          type: 'skill_practice',
          instructions: 'Complete a series of increasingly complex Flexbox layout challenges. Build navigation bars, card layouts, and form components using only Flexbox properties.',
          reflection_prompts: [
            'When did you use justify-content vs align-items?',
            'How did flex-wrap help with responsive behavior?',
            'What challenges did you face with centering content?',
            'How did the gap property simplify your spacing strategy?'
          ],
          success_criteria: [
            'Creates horizontal and vertical flex layouts',
            'Uses flex-wrap for responsive card grids',
            'Implements proper alignment with justify-content/align-items',
            'Applies flex-grow/flex-shrink for dynamic sizing',
            'Uses gap property for consistent spacing'
          ]
        },
        {
          id: 'grid-garden-challenge',
          title: 'CSS Grid Layout Challenge',
          type: 'skill_practice',
          instructions: 'Build progressively complex layouts using CSS Grid: photo galleries, dashboards, magazine layouts, and full page structures.',
          reflection_prompts: [
            'When did you use fr units vs percentages or pixels?',
            'How did named grid areas improve code readability?',
            'What\'s the benefit of repeat() and auto-fit?',
            'How did you handle responsive behavior with grid?'
          ],
          success_criteria: [
            'Creates multi-column layouts with grid-template-columns',
            'Uses named grid areas for semantic layouts',
            'Implements auto-fit/auto-fill for responsive grids',
            'Applies grid gap for consistent spacing',
            'Combines grid and flexbox appropriately'
          ]
        },
        {
          id: 'responsive-decision-tree',
          title: 'Responsive Design Decision Exercise',
          type: 'decision_making',
          instructions: 'Review various layout scenarios and choose the best CSS approach (Flexbox, Grid, or combination) with justification.',
          scenarios: [
            {
              id: 'navigation-bar',
              situation: 'Building a responsive navigation bar with logo, menu items, and action buttons',
              options: [
                {
                  text: 'Use Flexbox with justify-content: space-between',
                  outcome: 'Excellent choice - Flexbox is perfect for one-dimensional layouts',
                  feedback: '✅ Correct! Flexbox handles horizontal/vertical navigation switching elegantly.'
                },
                {
                  text: 'Use CSS Grid with multiple columns',
                  outcome: 'Overcomplicated - Grid is overkill for this use case',
                  feedback: '⚠️ While Grid works, Flexbox is simpler and more semantic for this linear layout.'
                },
                {
                  text: 'Use float-based layout',
                  outcome: 'Outdated approach with browser compatibility issues',
                  feedback: '❌ Floats are legacy. Modern projects should use Flexbox or Grid.'
                }
              ]
            },
            {
              id: 'dashboard-layout',
              situation: 'Creating a dashboard with header, sidebar, main content area, and footer',
              options: [
                {
                  text: 'CSS Grid with grid-template-areas',
                  outcome: 'Perfect! Grid excels at two-dimensional page layouts',
                  feedback: '✅ Excellent! Grid template areas make this layout clear and maintainable.'
                },
                {
                  text: 'Nested Flexbox containers',
                  outcome: 'Works but more complex than necessary',
                  feedback: '⚠️ While possible, nested Flexbox is harder to maintain than Grid for 2D layouts.'
                },
                {
                  text: 'Absolute positioning',
                  outcome: 'Fragile and not responsive-friendly',
                  feedback: '❌ Absolute positioning makes responsive design very difficult. Use Grid instead.'
                }
              ]
            }
          ],
          reflection_prompts: [
            'What factors influenced your choice between Flexbox and Grid?',
            'How do you determine if a layout is one-dimensional or two-dimensional?',
            'What are the maintainability implications of your choice?'
          ],
          success_criteria: [
            'Correctly identifies one-dimensional vs two-dimensional layouts',
            'Chooses appropriate layout method with clear justification',
            'Understands trade-offs between different approaches',
            'Considers responsiveness in layout decisions'
          ]
        }
      ],
      assessment_questions: [
        {
          id: 'flexbox-vs-grid',
          type: 'multiple_choice',
          question: 'When should you use Flexbox instead of Grid?',
          options: [
            'When building a full page layout with header, sidebar, and footer',
            'When creating a one-dimensional layout like a navigation bar or row of cards',
            'Flexbox is outdated and should be avoided in modern projects',
            'When you need precise control over both rows and columns'
          ],
          correct_answer: 1,
          explanation: 'Flexbox is designed for one-dimensional layouts (either row OR column), making it perfect for navigation bars, card rows, form inputs, and component-level layouts. Grid excels at two-dimensional layouts where you need control over both rows and columns simultaneously.'
        },
        {
          id: 'responsive-approach',
          type: 'scenario_based',
          question: 'You are building a product grid that should show 4 columns on desktop, 2 on tablet, and 1 on mobile. What is the most maintainable approach?',
          scenario: 'The grid must handle variable content heights and maintain consistent gaps between items.',
          evaluation_criteria: [
            'Suggests mobile-first approach with progressive enhancement',
            'Uses CSS Grid with appropriate column definitions',
            'Considers auto-fit or auto-fill for flexibility',
            'Implements proper gap handling',
            'Avoids excessive media queries by using flexible units'
          ]
        }
      ],
      practical_applications: [
        'Build responsive navigation systems for web applications',
        'Create flexible card-based layouts for content displays',
        'Design dashboard layouts with multiple panels and widgets',
        'Implement mobile-first responsive page structures',
        'Develop reusable layout components for design systems'
      ],
      additional_resources: [
        {
          title: 'CSS Grid Garden',
          type: 'tool',
          description: 'Interactive game to learn CSS Grid through challenges',
          internal: false
        },
        {
          title: 'Flexbox Froggy',
          type: 'tool',
          description: 'Learn Flexbox by helping Froggy and friends',
          internal: false
        },
        {
          title: 'MDN CSS Layout Guide',
          type: 'article',
          description: 'Comprehensive guide to modern CSS layout techniques',
          internal: false
        },
        {
          title: 'Can I Use - CSS Grid/Flexbox Support',
          type: 'tool',
          description: 'Check browser compatibility for layout features',
          internal: false
        }
      ]
    },
    {
      id: 'dom-manipulation-interactivity',
      title: 'DOM Manipulation & Interactive Components',
      type: 'interactive',
      duration_minutes: 60,
      description: 'Master JavaScript DOM manipulation to create interactive user interfaces, handle events, and build dynamic components from scratch.',
      is_required: true,
      order_index: 3,
      learning_outcomes: [
        'Select and manipulate DOM elements efficiently',
        'Handle user events with modern event listeners',
        'Create dynamic content and interactive components',
        'Understand event propagation and delegation patterns',
        'Build accessible interactive components'
      ],
      content_blocks: [
        {
          id: 'dom-fundamentals',
          type: 'text',
          content: `The Document Object Model (DOM) is the bridge between JavaScript and HTML, enabling dynamic web experiences. Understanding DOM manipulation is fundamental to creating interactive applications, even when using frameworks like React or Vue.

**Why DOM Manipulation Matters:**

Every modern framework abstracts DOM manipulation, but understanding the underlying mechanisms makes you a better developer:

- **Framework Understanding**: Knowing what React/Vue do under the hood helps debug issues
- **Performance Optimization**: Direct DOM manipulation can be faster for simple tasks
- **Framework-Free Solutions**: Sometimes vanilla JS is the best choice for simple interactions
- **Interview Preparation**: DOM manipulation is commonly tested in technical interviews

**Core DOM Operations:**

1. **Selection**: getElementById, querySelector, querySelectorAll
2. **Manipulation**: textContent, innerHTML, classList, dataset
3. **Creation**: createElement, appendChild, insertBefore, cloneNode
4. **Events**: addEventListener, removeEventListener, event delegation
5. **Traversal**: parentNode, childNodes, nextSibling, closest()`,
          order_index: 1
        },
        {
          id: 'dom-best-practices',
          type: 'key_points',
          title: 'DOM Manipulation Best Practices',
          content: [
            '**Use querySelector/querySelectorAll**: Modern, flexible selection over getElementById',
            '**Cache DOM References**: Store frequently accessed elements in variables to avoid repeated queries',
            '**Event Delegation**: Attach listeners to parent elements instead of individual children for better performance',
            '**Avoid innerHTML for User Content**: Prevents XSS attacks; use textContent or createElement instead',
            '**Batch DOM Updates**: Minimize reflows by making multiple changes before triggering layout',
            '**Use classList API**: Add/remove/toggle classes instead of manipulating className string',
            '**Dataset for Data Storage**: Use data-* attributes and dataset API for element-specific data',
            '**Remove Event Listeners**: Prevent memory leaks by cleaning up listeners when elements are removed'
          ],
          order_index: 2
        }
      ],
      interactive_elements: [
        {
          id: 'interactive-form-builder',
          title: 'Build an Interactive Form with Validation',
          type: 'skill_practice',
          instructions: 'Create a multi-step form with real-time validation, dynamic field generation, and user feedback. Include email validation, password strength indicator, and form submission handling.',
          reflection_prompts: [
            'How did you handle form validation without a library?',
            'What challenges did you face with event listeners?',
            'How did you provide accessible error messages?',
            'What would you do differently with a framework like React?'
          ],
          success_criteria: [
            'Implements real-time validation on input events',
            'Shows/hides form sections dynamically',
            'Provides clear error messages to users',
            'Uses event delegation where appropriate',
            'Prevents form submission on validation errors'
          ]
        },
        {
          id: 'modal-component-challenge',
          title: 'Create an Accessible Modal Dialog',
          type: 'skill_practice',
          instructions: 'Build a modal dialog component with proper accessibility (focus trapping, keyboard navigation, ARIA attributes), animations, and backdrop clicks to close.',
          reflection_prompts: [
            'How did you handle focus management when modal opens/closes?',
            'What accessibility features did you implement?',
            'How did you prevent body scroll when modal is open?',
            'What edge cases did you need to handle?'
          ],
          success_criteria: [
            'Traps focus within modal when open',
            'Closes on Escape key and backdrop click',
            'Returns focus to trigger element on close',
            'Uses proper ARIA attributes (role, aria-modal)',
            'Prevents body scroll when modal is active'
          ]
        }
      ],
      assessment_questions: [
        {
          id: 'event-delegation',
          type: 'multiple_choice',
          question: 'Why is event delegation more performant than attaching listeners to individual elements?',
          options: [
            'Event delegation makes the code run faster in all scenarios',
            'It reduces the number of event listeners, using less memory and simplifying dynamic content handling',
            'Event delegation automatically prevents memory leaks',
            'Browsers optimize delegated events differently'
          ],
          correct_answer: 1,
          explanation: 'Event delegation attaches a single listener to a parent element instead of multiple listeners on children. This reduces memory usage, simplifies adding/removing dynamic elements, and leverages event bubbling. It\'s especially beneficial for lists where items are frequently added or removed.'
        }
      ],
      practical_applications: [
        'Build interactive forms with real-time validation',
        'Create dynamic content filters and search functionality',
        'Implement custom dropdown menus and tooltips',
        'Develop interactive data tables with sorting and filtering',
        'Build single-page navigation without frameworks'
      ],
      additional_resources: [
        {
          title: 'MDN DOM API Reference',
          type: 'article',
          description: 'Complete reference for DOM manipulation methods',
          internal: false
        },
        {
          title: 'JavaScript30 - 30 Day Vanilla JS Challenge',
          type: 'video',
          description: 'Build 30 projects with vanilla JavaScript',
          internal: false
        }
      ]
    },
    {
      id: 'css-architecture-best-practices',
      title: 'CSS Architecture & Best Practices',
      type: 'article',
      duration_minutes: 25,
      description: 'Learn industry-standard CSS methodologies and best practices for writing maintainable, scalable stylesheets in team environments.',
      is_required: false,
      order_index: 4,
      learning_outcomes: [
        'Apply CSS naming conventions (BEM, SMACSS) for maintainability',
        'Organize stylesheets using modular architecture patterns',
        'Implement CSS custom properties for theming',
        'Avoid common CSS anti-patterns and technical debt',
        'Write scalable CSS for team environments'
      ],
      content_blocks: [
        {
          id: 'css-architecture-intro',
          type: 'text',
          content: `As applications grow, CSS can become unmaintainable without proper architecture. CSS methodologies provide structure and naming conventions that make stylesheets predictable and easier to work with in team environments.

**Why CSS Architecture Matters:**

Without structure, CSS codebases suffer from:
- Specificity wars (excessive use of !important)
- Naming collisions between components
- Difficulty understanding what CSS is safe to change
- Bloated stylesheets with unused rules
- Inconsistent styling across the application

**Popular Methodologies:**

- **BEM (Block Element Modifier)**: Structured naming convention
- **SMACSS**: Categorizing rules by type (base, layout, module)
- **OOCSS**: Separating structure from skin (theme)
- **Utility-First (Tailwind)**: Composing styles from utility classes`,
          order_index: 1
        },
        {
          id: 'bem-naming',
          type: 'key_points',
          title: 'BEM Naming Convention',
          content: [
            '**Block**: Standalone component (.button, .card, .nav)',
            '**Element**: Part of a block (.button__icon, .card__title)',
            '**Modifier**: Variation or state (.button--primary, .card--featured)',
            '**Benefits**: No naming collisions, clear component structure, easy to understand',
            '**Example**: .search-form__input--disabled makes intent crystal clear',
            '**Avoid**: Deep nesting (.block__element__subelement) - keep it flat',
            '**Modifiers on Elements**: .button__icon--large is valid for element variations'
          ],
          order_index: 2
        }
      ],
      practical_applications: [
        'Structure CSS for component-based architectures',
        'Create maintainable design systems',
        'Reduce CSS specificity conflicts in large applications',
        'Implement consistent theming with CSS custom properties',
        'Write CSS that scales with team growth'
      ],
      additional_resources: [
        {
          title: 'BEM Official Documentation',
          type: 'article',
          description: 'Complete guide to BEM methodology',
          internal: false
        },
        {
          title: 'CSS Architecture for Design Systems',
          type: 'article',
          description: 'Strategies for scalable CSS in large applications',
          internal: false
        }
      ]
    }
  ],
  capstone_project: {
    title: 'Build a Responsive Portfolio Website',
    description: 'Create a fully responsive portfolio website using modern JavaScript and CSS techniques. The project integrates all concepts from the module: ES6+, Flexbox/Grid layouts, DOM manipulation, and CSS architecture.',
    deliverables: [
      'Responsive multi-page portfolio (Home, Projects, About, Contact)',
      'Interactive project filtering with vanilla JavaScript',
      'Mobile-first responsive design with Flexbox and Grid',
      'Contact form with client-side validation',
      'Smooth scroll navigation and animations',
      'Organized CSS using BEM naming convention',
      'Deployment to GitHub Pages or Netlify'
    ],
    evaluation_criteria: [
      'Mobile-first responsive design works on all screen sizes',
      'Uses modern ES6+ JavaScript features appropriately',
      'Implements Flexbox and Grid for layouts',
      'Interactive features work without frameworks',
      'CSS is well-organized and follows naming conventions',
      'Code is clean, commented, and maintainable',
      'Site performs well and is accessible',
      'Successfully deployed and publicly accessible'
    ]
  }
};
