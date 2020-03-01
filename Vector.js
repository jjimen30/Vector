var Vector = function(x, y, z = 0) {

    validateXY(x, y);

    this.x = x;
    this.y = y;
    this.z = z;
    this.limit = 0;
}

/**
 * [Calculates the cross product of two Vector objects and returns a new Vector
 * composed of the result.
 * @return {[type]} [description]
 */
Vector.prototype.cross = function(v) {
    validateVector(v);

    var i;
    var j;
    var k;
    i = (this.y * v.z) - (this.z * v.y);
    j = -1 * (this.x * v.z) - (this.z * v.x);
    k = (this.x * v.y) - (this.y * v.x);

    return new Vector(i, j, k);
}

/**
 * Calculates the distance between this and another vector.
 * @param  {[type]} other [description]
 * @return {[type]}       [description]
 */
Vector.prototype.dist = function(other) {
    var v = Vector.sub(this, other);
    return v.mag();
}

/**
 * Adds a vector to this vector.
 * @param {[type]} other [description]
 */
Vector.prototype.add = function(other) {
    validateVector(other);
    this.set(this.x + other.x, this.y + other.y, this.z + other.z);
}

/**
 * Subtracts a vector from this vector.
 * @param  {[type]} other [description]
 * @return {[type]}       [description]
 */
Vector.prototype.sub = function(other) {
    validateVector(other);
    this.set(this.x - other.x, this.y - other.y, this.z - other.z);
}

/**
 * Returns the dot product between this and 
 * another vector.
 * @param  {[type]} other [description]
 * @return {[type]}       [description]
 */
Vector.prototype.dot = function(other) {
    return (this.x * other.x) + (this.y * other.y) + (this.z * other.z);
}

/**
 * Returns the magnitude of the vector.
 * 
 * @return {[type]} [description]
 */
Vector.prototype.mag = function() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
}

/**
 * Rotates this vector.
 * @param  {[type]} angle [description]
 * @return {[type]}       [description]
 */
Vector.prototype.rotate = function(angle) {
    // x' = x * cos(angle) - y * sin(angle);
    // y' = x * sin(angle) + y * cos(angle);

    if (angle != 0) {
        var newx = Math.cos(angle) * this.x - Math.sin(angle) * this.y;
        var newy = Math.sin(angle) * this.x + Math.cos(angle) * this.y;
        this.set(newx, newy);
    }

    return this;
}

/**
 * Sets this 
 * @return {[type]} [description]
 */
Vector.prototype.normalize = function() {
    var mag = this.mag();
    this.x /= mag;
    this.y /= mag;
    this.z /= mag;

    return this;
}

Vector.prototype.get = function() {
    return new Vector(this.x, this.y, this.z);
}

Vector.prototype.mult = function(scalar) {
    this.set(this.x * scalar, this.y * scalar, this.z * scalar);
}

Vector.prototype.set = function(x, y, z = 0) {
    var currentX = this.x;
    var currentY = this.y;
    var currentZ = this.z;

    this.x = x;
    this.y = y;
    this.z = z;

    if (this.limit > 0 && this.limit < this.mag()) {
        this.x = currentX;
        this.y = currentY;
        this.z = currentZ;
    }

    return this;
}

Vector.prototype.setLimit = function(limit) {
    if (!(this.limit > limit))
        this.limit = limit;
}

Vector.prototype.print = function() {
	console.log("<" + this.x + ", " + this.y + ", " + this.z + ">");
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++ S T A T I C   F U N C T I O N S +++++++++++++++++++++++++++++++

Vector.sub = function(v1, v2) {
    validateNumArgs(2, arguments);
    validateVector(v1);
    validateVector(v2);

    return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
}

/**
 * Returns a normalized vector from the vector passed in.
 * @param  {[type]} v [description]
 * @return {[type]}   [description]
 */
Vector.getUnitVector = function(v) {
    validateVector(v);

    var mag = v.mag();
    var x = v.x / mag;
    var y = v.y / mag;
    var z = v.z / mag;

    return new Vector(x, y, z);
}

/**
 * Multiplies a vector by a scalar and returns the result as a new Vector object.
 * 
 * @param  {[type]} v      [description]
 * @param  {[type]} scalar [description]
 * @return {[type]}        [description]
 */
Vector.mult = function(v, scalar) {
    validateNumArgs(2, arguments);
    validateVector(v);

    var x = v.x;
    var y = v.y;
    var z = v.z;

    return new Vector(x * scalar, y * scalar, z * scalar);
}

/**
 * Divides the passed vector by the passed scalar.
 * @param  {[type]} v1     [description]
 * @param  {[type]} scalar [description]
 * @return {[type]}        [description]
 */
Vector.div = function(v, scalar) {
    validateArgIsNotZero(scalar);
    validateVector(v1);
    validateNumArgs(2, arguments);

    var x = v.x;
    var y = v.y;
    var z = v.z;
    return new Vector(x / scalar, y / scalar, z / scalar);
}

/**
 * Takes to Vector objects and ands them.
 * @param {[type]} v1 [A vector object]
 * @param {[type]} v2 [A vector object]
 */
Vector.add = function(v1, v2) {
    validateVector(v1);
    validateVector(v2);

    return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
}



/**
 * Calculates and returns the angle between two 
 * vectors and returns the value in
 * radians
 * @param  {[type]} v1 [description]
 * @param  {[type]} v2 [description]
 * @return {[type]}    [description]
 */
Vector.angleBetween = function(v1, v2) {
    /*
     * ø = arccos(v•v2 / |v|•|v2|)
     */
    // v dotted with v2
    var dot = v1.dot(v2);

    // The magnitudes of the vectors
    var mag1 = v1.mag();
    var mag2 = v2.mag();

    var result = dot / (mag1 * mag2);

    return Math.acos(result);
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++ E X C E P T I O N S   H E L P E R S ++++++++++++++++++++++++++++++

function validateNumArgs(n, args) {
    if (args.length < n)
        throw "The number of arguments passed should be " + n;
}

function validateArgIsNotZero(input) {
    if (input == 0)
        throw "The argument should not be zero.";
}

function validateVector(v) {
    if (v == undefined)
        throw "The vector passed in is undefined.";
    if (typeof v == Vector)
        throw "The argument passed is not of type Vector.";
}


function validateXY(x, y) {
    if (x == undefined || y == undefined) {
        throw "x and y must be set.";
    }
}