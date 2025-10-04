const vertexShaderSrc = `
    attribute vec4 a_pos;
 
    void main() {
        gl_Position = a_pos;
    }
`

const fragmentShaderSrc = `
    // Fragment shaders don't have a default precision so we need
    // to pick one. mediump is a good default. It means "medium precision"
    precision mediump float;
    
    void main() {
        gl_FragColor = vec4(${29 / 255}, ${28 / 255}, ${39 / 255}, 1); 
    }
`

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
 
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  
  if (success) {
    return program;
  }
 
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

export default class Lake {
    /**
     * 
     * @param {number} cx 
     * @param {number} cy 
     * @param {number} rx 
     * @param {number} ry 
     */
    constructor(cx, cy, rx, ry) {
        this.cx = cx;
        this.cy = cy;
        this.rx = rx;
        this.ry = ry;
    }

    /**
     * @param {WebGL2RenderingContext} gl 
     */
    init(gl) {
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);
        this.program = createProgram(gl, vertexShader, fragmentShader);
    }

     /**
     * @param {WebGL2RenderingContext} gl 
     */
    draw(gl) {

        const vertices = createCircleVertices(this.cx, this.cy, this.rx, this.ry, 32);

        const positionAttributeLocation = gl.getAttribLocation(this.program, "a_pos");

        const positionBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(this.program);

        gl.enableVertexAttribArray(positionAttributeLocation);

        const size = 2;         
        const type = gl.FLOAT; 
        const normalize = false; 
        const stride = 0;    
        const offset = 0; 

        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length / 2);
    }
}


/**
 * Creates a list of verticies by cutting the circle into triangles using triangle fan method.
 * 
 * @param {number} cx 
 * @param {number} cy 
 * @param {number} rx 
 * @param {number} ry 
 * @param {number} numSegments 
 * @returns {number[]} vertices
 */
function createCircleVertices(cx, cy, rx, ry, numSegments = 32) {

    const vertices = [cx, cy]; 

    for (let i = 0; i <= numSegments; i++) {

        // Angle in radians for this segment
        const angle = (i / numSegments) * Math.PI * 2; 

        // Calculate the x and y position on the arc

        const x = cx + Math.cos(angle) * rx;

        const y = cy + Math.sin(angle) * ry;

        vertices.push(x, y);
    }

    return vertices;
}



