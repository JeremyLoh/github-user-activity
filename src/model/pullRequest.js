class PullRequest {
  constructor(pullRequest) {
    this.title = pullRequest["title"]
    this.body = pullRequest["body"]
    this.htmlUrl = pullRequest["html_url"]
    this.commits = pullRequest["commits"]
    this.additions = pullRequest["additions"]
    this.deletions = pullRequest["deletions"]
    this.changedFiles = pullRequest["changed_files"]
    // "head" => "label" is the branch name to take PR changes
    this.mergeFromBranch = pullRequest["head"]["label"]
    this.mergeToBranch = pullRequest["base"]["label"]
  }

  toString() {
    return `"${this.title}" from branch ${this.mergeFromBranch} => ${this.mergeToBranch}`
  }
}

module.exports = { PullRequest }
